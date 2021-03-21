const { expect } = require("chai");

const { isEmpty, isNotEmpty, find } = require("./array");

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

describe("#isNotEmpty()", () => {
  it("it should return false on undefined", () => {
    expect(isNotEmpty(undefined)).to.equal(false);
  });
  it("it should return false on null", () => {
    expect(isNotEmpty(null)).to.equal(false);
  });
  it("it should return false on empty string", () => {
    expect(isNotEmpty("")).to.equal(false);
  });
  it("it should return false on empty array", () => {
    expect(isNotEmpty([])).to.equal(false);
  });
  it("it should return true otherwise (happy path)", () => {
    expect(isNotEmpty("text")).to.equal(true);
    expect(isNotEmpty(3)).to.equal(true);
    expect(isNotEmpty([1, 2])).to.equal(true);
  });
});

describe("#find()", () => {
  it("it should return undefined on no match found", () => {
    expect(find("", undefined, isNotEmpty)).to.equal(undefined);
  });
  it("it should return a match (happy path)", () => {
    expect(find("", undefined, "Text", isNotEmpty)).to.equal("Text");
  });
});
