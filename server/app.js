const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const setupTestEnv = require("./test/setup");
const { isTest } = require("./utils/environment");
const logger = require("./utils/logger");
const rootRouter = require("./routes/index");

const { json, urlencoded } = express;

if (isTest()) {
  setupTestEnv();
}

// Connect MongoDB Driver
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("MongoDB connection succeeded");
  })
  .catch((err) => {
    logger.error("MongoDB connection failed : ", err);
  });

const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// Attach routes
app.use("/", rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
