/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const {
  BaseError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnexpectedError,
} = require('./httpErrors');

describe('#BaseError()', () => {
  it('it should extend Error class', () => {
    expect(new BaseError() instanceof Error).to.equal(true);
  });
  it("it should accept (message, status, metdata) as it's args and be able to export them on .json call", () => {
    const message = 'My Custom Message';
    const status = 401;
    const metadata = { trackNo: 3 };
    expect(new BaseError(message, status, metadata).json()).to.eql({
      message,
      status,
      metadata,
    });
  });
});

describe('#BadRequestError()', () => {
  it("it should accept (message, metdata) as it's args, extend BaseError and apply 400 status code", () => {
    const message = 'My Custom Message';
    const metadata = { trackNo: 3 };
    expect(new BadRequestError(message, metadata).json()).to.eql({
      message,
      status: 400,
      metadata,
    });
  });
  it('it should apply a default message if no message provided', () => {
    expect(new BadRequestError().json().message).not.to.be.empty;
  });
});

describe('#UnauthorizedError()', () => {
  it("it should accept (message, metdata) as it's args, extend BaseError and apply 401 status code", () => {
    const message = 'My Custom Message';
    const metadata = { trackNo: 3 };
    expect(new UnauthorizedError(message, metadata).json()).to.eql({
      message,
      status: 401,
      metadata,
    });
  });
  it('it should apply a default message if no message provided', () => {
    expect(new UnauthorizedError().json().message).not.to.be.empty;
  });
});

describe('#ForbiddenError()', () => {
  it("it should accept (message, metdata) as it's args, extend BaseError and apply 403 status code", () => {
    const message = 'My Custom Message';
    const metadata = { trackNo: 3 };
    expect(new ForbiddenError(message, metadata).json()).to.eql({
      message,
      status: 403,
      metadata,
    });
  });
  it('it should apply a default message if no message provided', () => {
    expect(new ForbiddenError().json().message).not.to.be.empty;
  });
});

describe('#NotFoundError()', () => {
  it("it should accept (message, metdata) as it's args, extend BaseError and apply 404 status code", () => {
    const message = 'My Custom Message';
    const metadata = { trackNo: 3 };
    expect(new NotFoundError(message, metadata).json()).to.eql({
      message,
      status: 404,
      metadata,
    });
  });
  it('it should apply a default message if no message provided', () => {
    expect(new NotFoundError().json().message).not.to.be.empty;
  });
});

describe('#ConflictError()', () => {
  it("it should accept (message, metdata) as it's args, extend BaseError and apply 409 status code", () => {
    const message = 'My Custom Message';
    const metadata = { trackNo: 3 };
    expect(new ConflictError(message, metadata).json()).to.eql({
      message,
      status: 409,
      metadata,
    });
  });
  it('it should apply a default message if no message provided', () => {
    expect(new ConflictError().json().message).not.to.be.empty;
  });
});

describe('#UnexpectedError()', () => {
  it('it should accept an error as an arg, extend BaseError and apply default message & 500 status code', () => {
    const message = 'My Custom Message';
    const error = new Error(message);
    const httpErrorPayload = new UnexpectedError(error).json();
    expect(httpErrorPayload.message).not.to.be.empty;
    expect(httpErrorPayload.status).to.equal(500);
  });
});
