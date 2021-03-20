const express = require("express");
const router = express.Router();

const pingRouter = require("./ping");

router.use("/ping", pingRouter);

module.exports = router;
