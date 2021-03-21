const { isEmpty } = require('../../utils/array');
const CustomError = require('../../utils/customError');
const ERRORS = require('../../utils/errors');

function authRequired(req, res, next) {
  const sub = req.cookies.SUB;
  if (isEmpty(sub)) {
    next(
      new CustomError({
        message: ERRORS.UNAUTHORIZED_REQUEST,
        status: 401,
      }),
    ); // Throw a 401 error and terminate the request.
  } else {
    req.sub = sub; // Attach sub claim to req (Sub claim represents user id).
    next();
  }
}

module.exports = authRequired;
