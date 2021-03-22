const { isNotEmptyString } = require('../../utils/lang');
const CustomError = require('../../utils/customError');
const ERRORS = require('../../utils/errors');

function authRequired(req, res, next) {
  const sub = req.cookies.SUB;
  if (isNotEmptyString(sub)) {
    req.sub = sub; // Attach sub claim to req (Sub claim represents user id).
    next();
  } else {
    next(
      new CustomError({
        message: ERRORS.UNAUTHORIZED_REQUEST,
        status: 401,
      }),
    ); // Throw a 401 error and terminate the request.
  }
}

module.exports = authRequired;
