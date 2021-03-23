const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors/httpErrors');
const logger = require('../utils/logger');
const { isValidEmail, isValidUsername, isValidPassword } = require('../utils/validate');
const { hash, compareHash } = require('../utils/crypto');
const User = require('../models/user');
const { isUndefined, isNull } = require('../utils/lang');
const ERRORS = require('../utils/errors/messages');

async function createUser({ username, email, password }) {
  // Validate Syntax
  if (isUndefined(email)) throw new BadRequestError(ERRORS.REQUIRED_EMAIL);
  if (isUndefined(username)) throw new BadRequestError(ERRORS.REQUIRED_USERNAME);
  if (isUndefined(password)) throw new BadRequestError(ERRORS.REQUIRED_PASSWORD);
  if (!isValidEmail(email)) throw new BadRequestError(ERRORS.INVALID_EMAIL);
  if (!isValidUsername(username)) {
    throw new BadRequestError(ERRORS.USERNAME_STARTS_WITH_NO_ALPH_CHAR);
  }
  if (!isValidPassword(password)) throw new BadRequestError(ERRORS.PASSWORD_LESS_THAN_6_CHARS);

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
