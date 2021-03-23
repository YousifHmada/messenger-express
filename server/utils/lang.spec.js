const { expect } = require('chai');

const {
  isUndefined, isDefined, isNull, isNotNull, isString, isNotEmptyString,
} = require('./lang');

describe('#isUndefined()', () => {
  it('it should return true on undefined (happy path)', () => {
    expect(isUndefined(undefined)).to.equal(true);
  });
  it('it should return false otherwise', () => {
    expect(isUndefined(null)).to.equal(false);
    expect(isUndefined(false)).to.equal(false);
    expect(isUndefined(true)).to.equal(false);
    expect(isUndefined('')).to.equal(false);
    expect(isUndefined('text')).to.equal(false);
    expect(isUndefined(3)).to.equal(false);
    expect(isUndefined([])).to.equal(false);
    expect(isUndefined([1, 2])).to.equal(false);
    expect(isUndefined({})).to.equal(false);
  });
});

describe('#isDefined()', () => {
  it('it should return false on undefined', () => {
    expect(isDefined(undefined)).to.equal(false);
  });
  it('it should return true otherwise (happy path)', () => {
    expect(isDefined(null)).to.equal(true);
    expect(isDefined(false)).to.equal(true);
    expect(isDefined(true)).to.equal(true);
    expect(isDefined('')).to.equal(true);
    expect(isDefined('text')).to.equal(true);
    expect(isDefined(3)).to.equal(true);
    expect(isDefined([])).to.equal(true);
    expect(isDefined([1, 2])).to.equal(true);
    expect(isDefined({})).to.equal(true);
  });
});

describe('#isNull()', () => {
  it('it should return true on null (happy path)', () => {
    expect(isNull(null)).to.equal(true);
  });
  it('it should return false otherwise', () => {
    expect(isNull(undefined)).to.equal(false);
    expect(isNull(false)).to.equal(false);
    expect(isNull(true)).to.equal(false);
    expect(isNull('')).to.equal(false);
    expect(isNull('text')).to.equal(false);
    expect(isNull(3)).to.equal(false);
    expect(isNull([])).to.equal(false);
    expect(isNull([1, 2])).to.equal(false);
    expect(isNull({})).to.equal(false);
  });
});

describe('#isNotNull()', () => {
  it('it should return false on null', () => {
    expect(isNotNull(null)).to.equal(false);
  });
  it('it should return true otherwise (happy path)', () => {
    expect(isNotNull(undefined)).to.equal(true);
    expect(isNotNull(false)).to.equal(true);
    expect(isNotNull(true)).to.equal(true);
    expect(isNotNull('')).to.equal(true);
    expect(isNotNull('text')).to.equal(true);
    expect(isNotNull(3)).to.equal(true);
    expect(isNotNull([])).to.equal(true);
    expect(isNotNull([1, 2])).to.equal(true);
    expect(isNotNull({})).to.equal(true);
  });
});

describe('#isString()', () => {
  it('it should return true on string (happy path)', () => {
    expect(isString('')).to.equal(true);
    expect(isString('text')).to.equal(true);
  });
  it('it should return false otherwise', () => {
    expect(isString(null)).to.equal(false);
    expect(isString(undefined)).to.equal(false);
    expect(isString(false)).to.equal(false);
    expect(isString(true)).to.equal(false);
    expect(isString(3)).to.equal(false);
    expect(isString({})).to.equal(false);
    expect(isString([])).to.equal(false);
    expect(isString([1, 2])).to.equal(false);
  });
});

describe('#isNotEmptyString()', () => {
  it("it should return true if it's a string and it's not empty (happy path)", () => {
    expect(isNotEmptyString('text')).to.equal(true);
  });
  it('it should return false otherwisNotEmptye', () => {
    expect(isNotEmptyString(null)).to.equal(false);
    expect(isNotEmptyString(undefined)).to.equal(false);
    expect(isNotEmptyString(false)).to.equal(false);
    expect(isNotEmptyString(true)).to.equal(false);
    expect(isNotEmptyString('')).to.equal(false);
    expect(isNotEmptyString(3)).to.equal(false);
    expect(isNotEmptyString({})).to.equal(false);
    expect(isNotEmptyString([])).to.equal(false);
    expect(isNotEmptyString([1, 2])).to.equal(false);
  });
});
