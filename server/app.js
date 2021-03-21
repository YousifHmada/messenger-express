const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const setupTestEnv = require('./test/setup');
const { isTest, isDevelopment } = require('./utils/environment');
const logger = require('./utils/logger');
const CustomError = require('./utils/customError');
const rootRouter = require('./routes/index');

const { json, urlencoded } = express;

/**
 * TODO : Accept CORS in dev env, Do not accept CORS in
 * prod env so that we still safe against CSRF attacks
 */

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
    logger.info('MongoDB connection succeeded');
  })
  .catch((err) => {
    logger.error('MongoDB connection failed : ', err);
  });

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Attach routes
app.use('/', rootRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = isDevelopment() ? err : {};

  const error = err instanceof CustomError ? err : new CustomError(err);
  res.status(error.status);
  res.json(error.json());
});

module.exports = app;
