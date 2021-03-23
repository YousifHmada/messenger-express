const { expect } = require('chai');

const { isValidUsername, isValidEmail, isValidPassword } = require('./validate');

describe('#isValidUsername()', () => {
  it('it should return false if username starts with a number', () => {
    expect(isValidUsername('2old')).to.equal(false);
  });
  it('it should return true otherwise (happy path)', () => {
    expect(isValidUsername('jo')).to.equal(true);
  });
});

describe('#isValidEmail()', () => {
  it('it should return false if email is invalid', () => {
    expect(isValidEmail('john')).to.equal(false);
  });
  it('it should return true otherwise (happy path)', () => {
    expect(isValidEmail('johnwick@hw.com')).to.equal(true);
  });
});

describe('#isValidPassword()', () => {
  it('it should return false if password is <6 chars', () => {
    expect(isValidPassword('123')).to.equal(false);
  });
  it('it should return true otherwise (happy path)', () => {
    expect(isValidPassword('123456')).to.equal(true);
  });
});
