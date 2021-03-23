const bcrypt = require('bcrypt');

const { isDefined } = require('./lang');

/**
 * Generates a hash of the given text and rejects if any errors encountered
 * @param  {String} text [text to hash]
 * @return {Promise<String>}
 */
function hash(text) {
  return new Promise((res, rej) => bcrypt.hash(
    text,
    Number(process.env.HASH_SALT_ROUNDS),
    (err, hashedText) => {
      if (isDefined(err)) {
        rej(err);
      } else {
        res(hashedText);
      }
    },
  ));
}

/**
 * Checks if text matches the given hash
 * @param  {String} text
 * @param  {String} hashedText [hash]
 * @return {Promise<Boolean>}
 */
function compareHash(text, hashedText) {
  return new Promise((res) => bcrypt.compare(text, hashedText, (_, valid) => res(valid)));
}

module.exports.hash = hash;
module.exports.compareHash = compareHash;
