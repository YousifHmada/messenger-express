function isValidEmail(value) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}

function isValidUsername(value) {
  return /^[a-zA-Z].+$/i.test(value);
}

function isValidPassword(value) {
  return /(?=.{6,})/i.test(value);
}

module.exports = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
};
