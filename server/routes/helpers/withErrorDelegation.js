// This delegated errors to the error route handler
function withErrorDelegation(cb) {
  return async function routeHandler(req, res, next) {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = withErrorDelegation;
