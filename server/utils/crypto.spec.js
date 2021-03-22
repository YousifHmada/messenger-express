const { expect } = require('chai');

const { hash, compareHash } = require('./crypto');

describe('#hash()', () => {
  it('it should return a hashed text (happy path)', async () => {
    expect(await hash('text')).to.not.equal('text');
  });
});

describe('#compareHash()', () => {
  it('it should resolve to true if inputs match (happy path)', async () => {
    const hashedText = await hash('text');
    expect(await compareHash('text', hashedText)).to.equal(true);
  });
  it('it should resolve to false otherwise', async () => {
    expect(await compareHash('text', 'badHash')).to.equal(false);
  });
});
