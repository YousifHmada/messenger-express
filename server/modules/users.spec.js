const { expect } = require('chai');
const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const ERRORS = require('../utils/errors/messages');
const { BaseError } = require('../utils/errors/httpErrors');

const validUserPayload = {
  username: 'johnwick',
  email: 'johnwick@wh.com',
  password: '123456',
};

const invalidUserPayload = {
  username: '2john',
  email: 'johnwick',
  password: '123',
};

const userRecord = {
  id: '605684af8aaaf20683d56c9f',
  username: 'johnwick',
  email: 'johnwick@wh.com',
  password: '******',
};

let sandbox;
let User;
let usersModule;
let crypto;
let validate;

beforeEach(() => {
  sandbox = sinon.createSandbox();
  // eslint-disable-next-line no-proto
  userRecord.__proto__ = {
    save: sinon.stub().returns(userRecord),
  };
  User = sinon.stub().returns(userRecord);
  User.findById = sinon.stub().returns(userRecord);
  User.findOne = sinon.stub().returns(userRecord);
  crypto = {
    hash: sinon.stub().returns(userRecord.password),
    compareHash: sinon.stub().resolves(true),
  };
  validate = {
    validateUsername: sinon.stub().returns(undefined),
    validateEmail: sinon.stub().returns(undefined),
    validatePassword: sinon.stub().returns(undefined),
  };
  usersModule = proxyquire('./users.js', {
    '../models/user': User,
    '../utils/crypto': crypto,
    '../utils/validate': validate,
  });
});

afterEach(() => {
  sandbox.restore();
});

describe('#createUser()', () => {
  it('it should call username, email and password validations and throw an error if not valid', async () => {
    try {
      validate.validateUsername.returns(ERRORS.USERNAME_STARTS_WITH_NO_ALPH_CHAR);
      await usersModule.createUser(invalidUserPayload);
      assert.rejects();
    } catch (error) {
      sinon.assert.calledWith(validate.validateUsername, invalidUserPayload.username);
      sinon.assert.calledWith(validate.validateEmail, invalidUserPayload.email);
      sinon.assert.calledWith(validate.validatePassword, invalidUserPayload.password);
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.USERNAME_STARTS_WITH_NO_ALPH_CHAR);
    }
  });
  it('it should hash the password', async () => {
    await usersModule.createUser(validUserPayload);
    sinon.assert.calledOnce(crypto.hash);
  });
  it('it should construct a new User', async () => {
    await usersModule.createUser(validUserPayload);
    sinon.assert.calledWithNew(User);
    sinon.assert.calledWith(User, {
      ...validUserPayload,
      password: userRecord.password,
    });
  });
  it('it should call user.save and return the response (happy path)', async () => {
    const response = await usersModule.createUser(validUserPayload);
    expect(response).to.equal(userRecord);
    sinon.assert.calledOnce(userRecord.save);
  });
  it('it should throw an error in case of duplicate email', async () => {
    try {
      userRecord.save.throws({ code: 11000 });
      await usersModule.createUser(validUserPayload);
      assert.rejects();
    } catch (error) {
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.EMAIL_ALREADY_EXISTS);
      expect(error.status).to.equal(409);
    }
  });
  it('it should delegate other errors from user.save as well', async () => {
    const err1 = new Error();
    try {
      userRecord.save.throws(err1);
      await usersModule.createUser(validUserPayload);
      assert.rejects();
    } catch (err2) {
      expect(err2).to.equal(err1);
    }
  });
});

describe('#getUserByCredsOrFail()', () => {
  it('it should throw an error if no email is provided', async () => {
    try {
      await usersModule.getUserByCredsOrFail();
      assert.rejects();
    } catch (error) {
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.REQUIRED_EMAIL);
    }
  });
  it('it should throw an error if no password is provided', async () => {
    try {
      await usersModule.getUserByCredsOrFail(validUserPayload.email);
      assert.rejects();
    } catch (error) {
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.REQUIRED_PASSWORD);
    }
  });
  it('it should call user.findOne, compareHash, then return the response (happy path)', async () => {
    const response = await usersModule.getUserByCredsOrFail(
      validUserPayload.email,
      validUserPayload.password,
    );
    expect(response).to.equal(userRecord);
    sinon.assert.calledWith(User.findOne, { email: userRecord.email });
  });
  it('it should throw an error if no user found', async () => {
    try {
      User.findOne.returns(null);
      await usersModule.getUserByCredsOrFail(validUserPayload.email, validUserPayload.password);
      assert.rejects();
    } catch (error) {
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.INVALID_EMAIL_OR_PASSWORD);
      expect(error.status).to.equal(403);
    }
  });
  it("it should throw an error if hash & password don't match", async () => {
    try {
      crypto.compareHash.resolves(false);
      await usersModule.getUserByCredsOrFail(validUserPayload.email, validUserPayload.password);
      // assert.rejects();
    } catch (error) {
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.INVALID_EMAIL_OR_PASSWORD);
      expect(error.status).to.equal(403);
    }
  });
});

describe('#getUserByIdOrFail()', () => {
  it('it should call User.findById and return the response (happy path)', async () => {
    const response = await usersModule.getUserByIdOrFail(userRecord.id);
    expect(response).to.equal(userRecord);
    sinon.assert.calledWith(User.findById, userRecord.id);
  });
  it('it should throw an error if no user found', async () => {
    User.findById.returns(null);
    try {
      await usersModule.getUserByIdOrFail();
      assert.rejects();
    } catch (error) {
      expect(error instanceof BaseError).to.equal(true);
      expect(error.message).to.equal(ERRORS.USER_NOT_FOUND);
      expect(error.status).to.equal(404);
    }
  });
});
