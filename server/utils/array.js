/**
 * Iterates over elements of collection, returning the first match
 * It follows the Spread Syntax with the last arg being the filter function
 * @param  {[...Any, Function]} args
 * @return {Any | undefined}
 */
function find(...args) {
  const cb = args[args.length - 1];
  const values = args.slice(0, args.length - 1);
  return values.find(cb);
}

module.exports = {
  find,
};
