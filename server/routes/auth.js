const express = require('express');

const router = express.Router();

const withErrorDelegation = require('./helpers/withErrorDelegation');
const authRequired = require('./middlewares/authRequired');
const {
  createUser,
  getUserByCredsOrFail,
  getUserByIdOrFail,
} = require('../modules/users');
const { isProduction } = require('../utils/environment');

router.post(
  '/register',
  withErrorDelegation(async (req, res) => {
    const { username, email, password } = req.body;
    await createUser({ username, email, password });
    res.status(201).send();
  }),
);

router.post(
  '/login',
  withErrorDelegation(async (req, res) => {
    const { email, password } = req.body;
    const { _id: id } = await getUserByCredsOrFail(email, password);

    // Use this cookie to track user auth status
    res.cookie('SUB', id, {
      httpOnly: true, // Ensures no accessibility from JS (XSS proof)
      secure: isProduction(), // Only apply secure flag in production env
    });

    res.status(201).send();
  }),
);

router.get(
  '/me',
  authRequired,
  withErrorDelegation(async (req, res) => {
    const user = await getUserByIdOrFail(req.sub);
    res.status(200).send(user.json());
  }),
);

module.exports = router;
