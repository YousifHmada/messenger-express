const { isProduction } = require('../../utils/environment');

function setAuthCookie(res, userId) {
  // Use this cookie to track user auth status
  res.cookie('SUB', userId, {
    httpOnly: true, // Ensures no accessibility from JS (XSS proof)
    secure: isProduction(), // Only apply secure flag in production env
  });
}

function clearAuthCookie(res) {
  // Use this cookie to track user auth status
  res.clearCookie('SUB');
}

module.exports = {
  setAuthCookie,
  clearAuthCookie,
};
