const winston = require("winston");

const { isProduction } = require("./environment");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.json(),
});

if (!isProduction()) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ); // Logs to STDOUT
}

module.exports = logger;
