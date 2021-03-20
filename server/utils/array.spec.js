const { expect } = require("chai");

const { isEmpty } = require("./array");

describe("#isEmpty()", () => {
  it("it should return true on undefined", () => {
    expect(isEmpty(undefined)).to.equal(true);
  });
  it("it should return true on null", () => {
    expect(isEmpty(null)).to.equal(true);
  });
  it("it should return true on empty string", () => {
    expect(isEmpty("")).to.equal(true);
  });
  it("it should return true on empty array", () => {
    expect(isEmpty([])).to.equal(true);
  });
  it("it should return false otherwise (happy path)", () => {
    expect(isEmpty("text")).to.equal(false);
    expect(isEmpty(3)).to.equal(false);
    expect(isEmpty([1, 2])).to.equal(false);
  });
});
