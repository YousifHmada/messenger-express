const { expect } = require('chai');

const { hash, compareHash } = require('./crypto');
const ERRORS = require('./errors/messages');

describe('#hash()', () => {
  it('it should return a hashed text (happy path)', async () => {
    expect(await hash('text')).to.not.equal('text');
  });
});

describe('#compareHash()', () => {
  it("it should resolve to an error if inputs don't match", async () => {
    expect(await compareHash('text', 'badHash')).to.equal(
      ERRORS.HASH_DOESNT_MATCH,
    );
  });
  it('it should resolve to undefined (happy path)', async () => {
    const hashedText = await hash('text');
    expect(await compareHash('text', hashedText)).to.equal(undefined);
  });
});
