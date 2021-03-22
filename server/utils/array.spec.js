const { expect } = require('chai');

const { find } = require('./array');
const { isUndefined, isNotEmptyString } = require('./lang');

describe('#find()', () => {
  it('it should return undefined on no match found', () => {
    expect(find('', undefined, isUndefined)).to.equal(undefined);
  });
  it('it should return a match (happy path)', () => {
    expect(find('', undefined, 'Text', isNotEmptyString)).to.equal('Text');
  });
});
