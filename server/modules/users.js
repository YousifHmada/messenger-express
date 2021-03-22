const CustomError = require('../utils/customError');
const logger = require('../utils/logger');
const { validateUsername, validateEmail, validatePassword } = require('../utils/validate');
const { hash, compareHash } = require('../utils/crypto');
const User = require('../models/user');
const { find } = require('../utils/array');
const { isNotEmptyString, isUndefined, isNull } = require('../utils/lang');
const ERRORS = require('../utils/errors');

async function createUser({ username, email, password }) {
  // Validate Syntax
  const syntaxError = find(
    validateUsername(username),
    validateEmail(email),
    validatePassword(password),
    isNotEmptyString,
  );
  if (syntaxError) throw new CustomError(syntaxError);

  const user = new User({
    username,
    email,
    password: await hash(password),
  });

  try {
    /**
     * NOTE - don't use return directly, use await then return the response,
     * so that errors get caught in this function not the outer one
     */
    const response = await user.save();
    logger.debug('User created', {
      email,
      response,
    });

    return response;
  } catch (error) {
    // NOTE - code 11000 means `unique key violation`, duplicate emails in our case
    if (error.code === 11000) {
      throw new CustomError({
        message: ERRORS.EMAIL_ALREADY_EXISTS,
        status: 409,
      });
    } else {
      throw error;
    }
  }
}

async function getUserByCredsOrFail(email, password) {
  // Validate Syntax
  if (isUndefined(email)) throw new CustomError(ERRORS.REQUIRED_EMAIL);
  if (isUndefined(password)) throw new CustomError(ERRORS.REQUIRED_PASSWORD);

  // Validate Email Exists
  const user = await User.findOne({ email });
  if (isNull(user)) {
    throw new CustomError({
      message: ERRORS.INVALID_EMAIL_OR_PASSWORD,
      status: 403,
    });
  }

  // Compare plain & hashed passwords
  const error = await compareHash(password, user.password);
  if (isNotEmptyString(error)) {
    throw new CustomError({
      message: ERRORS.INVALID_EMAIL_OR_PASSWORD,
      status: 403,
    });
  }

  return user;
}

async function getUserByIdOrFail(id) {
  const user = await User.findById(id);
  if (isNull(user)) {
    throw new CustomError({
      message: ERRORS.USER_NOT_FOUND,
      status: 404,
    });
  }

  return user;
}

module.exports = {
  createUser,
  getUserByCredsOrFail,
  getUserByIdOrFail,
};
