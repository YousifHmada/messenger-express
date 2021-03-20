function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (value.hasOwnProperty("length") && value.length === 0)
  );
}

module.exports = {
  isEmpty,
};
