const express = require("express");
const router = express.Router();

router.post("/register", function (req, res, next) {
  const { username, email, password } = req.body;
  res.status(201);
});

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  res.status(201);
});

router.get("/me", function (req, res, next) {
  res.status(200).send({});
});

module.exports = router;
