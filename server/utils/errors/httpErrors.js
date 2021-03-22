/* eslint-disable max-classes-per-file */
const { isDevelopment } = require('../environment');

class BaseError extends Error {
  constructor(message, status, metadata) {
    super(message);
    this.message = message;
    this.status = status;
    this.metadata = metadata;
  }

  json() {
    return {
      message: this.message,
      status: this.status,
      metadata: this.metadata,
    };
  }
}

class BadRequestError extends BaseError {
  constructor(message = 'Bad Request', metadata) {
    super(message, 400, metadata);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized', metadata) {
    super(message, 401, metadata);
  }
}

class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden', metadata) {
    super(message, 403, metadata);
  }
}

class NotFoundError extends BaseError {
  constructor(message = 'Not Found', metadata) {
    super(message, 404, metadata);
  }
}

class ConflictError extends BaseError {
  constructor(message = 'Conflict', metadata) {
    super(message, 409, metadata);
  }
}

class UnexpectedError extends BaseError {
  constructor(error) {
    const message = isDevelopment() ? error.message : 'Unexpected error occured';
    super(message, 500);
    this.stack = error.stack; // Attach the current error stack
  }

  json() {
    return {
      ...BaseError.prototype.json.call(this), // Call .json() from parent class
      stack: isDevelopment() ? this.stack : undefined, // Add the stack if it's the dev env
    };
  }
}

module.exports = {
  BaseError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnexpectedError,
};
