const express = require("express");
const router = express.Router();

const pingRouter = require("./ping");
const authRouter = require("./auth");

router.use("/ping", pingRouter);
router.use("/auth", authRouter);

module.exports = router;
