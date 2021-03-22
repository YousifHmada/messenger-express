const express = require('express');

const router = express.Router();

const withErrorDelegation = require('./helpers/withErrorDelegation');
const authRequired = require('./middlewares/authRequired');
const {
  createUser,
  getUserByCredsOrFail,
  getUserByIdOrFail,
} = require('../modules/users');
const { setAuthCookie, clearAuthCookie } = require('./helpers/cookies');

router.post(
  '/register',
  withErrorDelegation(async (req, res) => {
    const { username, email, password } = req.body;
    const { _id: id } = await createUser({ username, email, password });
    setAuthCookie(res, id);
    res.status(201).send();
  }),
);

router.post(
  '/login',
  withErrorDelegation(async (req, res) => {
    const { email, password } = req.body;
    const { _id: id } = await getUserByCredsOrFail(email, password);
    setAuthCookie(res, id);
    res.status(201).send();
  }),
);

router.post(
  '/logout',
  withErrorDelegation(async (req, res) => {
    clearAuthCookie(res);
    res.status(201).send();
  }),
);

router.get(
  '/userinfo',
  authRequired,
  withErrorDelegation(async (req, res) => {
    const user = await getUserByIdOrFail(req.sub);
    res.status(200).send(user.json());
  }),
);

module.exports = router;
