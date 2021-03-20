const { isEmpty } = require("./array");

function validateEmail(value) {
  if (isEmpty(value)) throw new Error("Email is required");
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    throw new Error("Invalid email address");
  }
}

function validateUsername(value) {
  if (isEmpty(value)) throw new Error("Username is required");
  if (!/^[a-zA-Z].+$/i.test(value)) {
    throw new Error("Username should start with an alphabetical character");
  }
}

function validatePassword(value) {
  if (isEmpty(value)) throw new Error("Password is required");
  if (!/(?=.{6,})/i.test(value)) {
    throw new Error("The password must be six characters or longer");
  }
}

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword,
};
