function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (value.hasOwnProperty("length") && value.length === 0)
  );
}

function isNotEmpty(v) {
  return !isEmpty(v);
}

function find(...args) {
  const cb = args[args.length - 1];
  const values = args.slice(0, args.length - 1);
  return values.find(cb);
}

module.exports = {
  isEmpty,
  isNotEmpty,
  find,
};
