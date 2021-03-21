const { isDevelopment } = require('./environment');

class CustomError extends Error {
  constructor(payload) {
    super();
    if (payload instanceof Error) {
      this.message = isDevelopment()
        ? payload.message
        : 'Unexpected error occured';
      this.status = 500;
      this.stack = payload.stack;
      this.showStack = isDevelopment();
    } else if (typeof payload === 'object') {
      this.message = payload.message;
      this.status = payload.status || 400;
      this.metadata = payload.metadata;
    } else {
      this.message = payload;
      this.status = 400;
    }
  }

  json() {
    return {
      message: this.message,
      status: this.status,
      metadata: this.metadata,
      stack: this.showStack ? this.stack : undefined,
    };
  }
}

module.exports = CustomError;
