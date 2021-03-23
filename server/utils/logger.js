const winston = require('winston');

const { isProduction } = require('./environment');

/**
 * logger is like console, you can logger.{log,warn,error, etc...}
 * the main reason to be using that is to have a centralized util
 * for logging, then we can pipe those logs to 3rd party services
 * like DataDog or save them on disk if we need to.
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.json(),
});

if (!isProduction()) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ); // Logs to STDOUT
}

module.exports = logger;
