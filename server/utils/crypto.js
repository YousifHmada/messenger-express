const bcrypt = require('bcrypt');

const { isNotEmpty } = require('./array');
const ERRORS = require('./errors');

function hash(text) {
  return new Promise((res, rej) => bcrypt.hash(
    text,
    Number(process.env.HASH_SALT_ROUNDS),
    (err, hashedText) => {
      if (isNotEmpty(err)) {
        rej(err);
      } else {
        res(hashedText);
      }
    },
  ));
}

function compareHash(text, hashedText) {
  return new Promise((res) => bcrypt.compare(text, hashedText, (_, valid) => {
    if (!valid) {
      res(ERRORS.HASH_DOESNT_MATCH);
    } else {
      res();
    }
  }));
}

module.exports.hash = hash;
module.exports.compareHash = compareHash;
