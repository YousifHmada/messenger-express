const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors/httpErrors');
const logger = require('../utils/logger');
const { validateUsername, validateEmail, validatePassword } = require('../utils/validate');
const { hash, compareHash } = require('../utils/crypto');
const User = require('../models/user');
const { find } = require('../utils/array');
const { isNotEmptyString, isUndefined, isNull } = require('../utils/lang');
const ERRORS = require('../utils/errors/messages');

async function createUser({ username, email, password }) {
  // Validate Syntax
  const syntaxErrorMessage = find(
    validateUsername(username),
    validateEmail(email),
    validatePassword(password),
    isNotEmptyString,
  );
  if (syntaxErrorMessage) throw new BadRequestError(syntaxErrorMessage);

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
      throw new ConflictError(ERRORS.EMAIL_ALREADY_EXISTS);
    } else {
      throw error;
    }
  }
}

async function getUserByCredsOrFail(email, password) {
  // Validate Syntax
  if (isUndefined(email)) throw new BadRequestError(ERRORS.REQUIRED_EMAIL);
  if (isUndefined(password)) throw new BadRequestError(ERRORS.REQUIRED_PASSWORD);

  // Validate Email Exists
  const user = await User.findOne({ email });
  if (isNull(user)) {
    throw new ForbiddenError(ERRORS.INVALID_EMAIL_OR_PASSWORD);
  }

  // Compare plain & hashed passwords
  const passwordsMatch = await compareHash(password, user.password);
  if (!passwordsMatch) {
    throw new ForbiddenError(ERRORS.INVALID_EMAIL_OR_PASSWORD);
  }

  return user;
}

async function getUserByIdOrFail(id) {
  const user = await User.findById(id);
  if (isNull(user)) {
    throw new NotFoundError(ERRORS.USER_NOT_FOUND);
  }

  return user;
}

module.exports = {
  createUser,
  getUserByCredsOrFail,
  getUserByIdOrFail,
};
