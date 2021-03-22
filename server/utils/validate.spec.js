const { expect } = require('chai');

const ERRORS = require('./errors/messages');

const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require('./validate');

describe('#validateUsername()', () => {
  it('it should return an error if username is empty', () => {
    expect(validateUsername()).to.equal(ERRORS.REQUIRED_USERNAME);
  });
  it('it should return an error if username starts with a number', () => {
    expect(validateUsername('2old')).to.equal(
      ERRORS.USERNAME_STARTS_WITH_NO_ALPH_CHAR,
    );
  });
  it('it should return undefined otherwise (happy path)', () => {
    expect(validateUsername('jo')).to.equal(undefined);
  });
});

describe('#validateEmail()', () => {
  it('it should return an error if email is empty', () => {
    expect(validateEmail()).to.equal(ERRORS.REQUIRED_EMAIL);
  });
  it('it should return an error if email is invalid', () => {
    expect(validateEmail('john')).to.equal(ERRORS.INVALID_EMAIL);
  });
  it('it should return undefined otherwise (happy path)', () => {
    expect(validateEmail('johnwick@hw.com')).to.equal(undefined);
  });
});

describe('#validatePassword()', () => {
  it('it should return an error if password is empty', () => {
    expect(validatePassword()).to.equal(ERRORS.REQUIRED_PASSWORD);
  });
  it('it should return an error if password is <6 chars', () => {
    expect(validatePassword('123')).to.equal(ERRORS.PASSWORD_LESS_THAN_6_CHARS);
  });
  it('it should return undefined otherwise (happy path)', () => {
    expect(validatePassword('123456')).to.equal(undefined);
  });
});
