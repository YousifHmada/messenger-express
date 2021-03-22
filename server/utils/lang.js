/**
 * Checks if value is undefined.
 * @param  {Any} value
 * @return {Boolean}
 */
function isUndefined(value) {
  return value === undefined;
}

/**
 * Checks if value is defined.
 * @param  {Any} value
 * @return {Boolean}
 */
function isDefined(value) {
  return !isUndefined(value);
}

/**
 * Checks if value is null.
 * @param  {Any} value
 * @return {Boolean}
 */
function isNull(value) {
  return value === null;
}

/**
 * Checks if value is not null.
 * @param  {Any} value
 * @return {Boolean}
 */
function isNotNull(value) {
  return !isNull(value);
}

/**
 * Checks if value is a string.
 * @param  {Any} value
 * @return {Boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Checks if value is a string and that it's not empty.
 * @param  {Any} value
 * @return {Boolean}
 */
function isNotEmptyString(value) {
  return isString(value) && value !== '';
}

module.exports = {
  isUndefined,
  isDefined,
  isNull,
  isNotNull,
  isString,
  isNotEmptyString,
};
