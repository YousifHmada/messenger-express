const { isEmpty } = require("./array");
const ERRORS = require("./errors");

function validateEmail(value) {
  if (isEmpty(value)) return ERRORS.REQUIRED_EMAIL;
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return ERRORS.INVALID_EMAIL;
  }
}

function validateUsername(value) {
  if (isEmpty(value)) return ERRORS.REQUIRED_USERNAME;
  else if (!/^[a-zA-Z].+$/i.test(value)) {
    return ERRORS.USERNAME_STARTS_WITH_NO_ALPH_CHAR;
  }
}

function validatePassword(value) {
  if (isEmpty(value)) return ERRORS.REQUIRED_PASSWORD;
  else if (!/(?=.{6,})/i.test(value)) {
    return ERRORS.PASSWORD_LESS_THAN_6_CHARS;
  }
}

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword,
};
