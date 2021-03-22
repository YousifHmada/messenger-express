const { isNotEmptyString } = require('../../utils/lang');
const { UnauthorizedError } = require('../../utils/errors/httpErrors');
const ERRORS = require('../../utils/errors/messages');

function authRequired(req, res, next) {
  const sub = req.cookies.SUB;
  if (isNotEmptyString(sub)) {
    req.sub = sub; // Attach sub claim to req (Sub claim represents user id).
    next();
  } else {
    next(
      new UnauthorizedError(ERRORS.UNAUTHORIZED_REQUEST),
    ); // Throw a 401 error and terminate the request.
  }
}

module.exports = authRequired;
