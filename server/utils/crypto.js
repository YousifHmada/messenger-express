const bcrypt = require("bcrypt");

const { isNotEmpty, isEmpty, find } = require("./array");
const ERRORS = require("./errors");

function hash(text) {
  return new Promise((res, rej) =>
    bcrypt.hash(
      text,
      Number(process.env.HASH_SALT_ROUNDS),
      function (err, hash) {
        if (isNotEmpty(err)) {
          rej(err);
        } else {
          res(hash);
        }
      }
    )
  );
}

function compareHash(text, hash) {
  return new Promise((res) =>
    bcrypt.compare(text, hash, (_, valid) => {
      if (!valid) {
        res(ERRORS.HASH_DOESNT_MATCH);
      } else {
        res();
      }
    })
  );
}

module.exports.hash = hash;
module.exports.compareHash = compareHash;
