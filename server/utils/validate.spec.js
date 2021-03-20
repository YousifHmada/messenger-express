const { expect } = require("chai");

const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("./validate");

describe("#validateUsername()", () => {
  it("it should throw an error if username is empty", () => {
    expect(() => validateUsername()).to.throw("Username is required");
  });
  it("it should throw an error if username starts with a number", () => {
    expect(() => validateUsername("2old")).to.throw(
      "Username should start with an alphabetical character"
    );
  });
  it("it should accept username otherwise (happy path)", () => {
    expect(() => validateUsername("jo")).not.to.throw();
  });
});

describe("#validateEmail()", () => {
  it("it should throw an error if email is empty", () => {
    expect(() => validateEmail()).to.throw("Email is required");
  });
  it("it should throw an error if email is invalid", () => {
    expect(() => validateEmail("john")).to.throw("Invalid email address");
  });
  it("it should accept email otherwise (happy path)", () => {
    expect(() => validateEmail("johnwick@hw.com")).not.to.throw();
  });
});

describe("#validatePassword()", () => {
  it("it should throw an error if password is empty", () => {
    expect(() => validatePassword()).to.throw("Password is required");
  });
  it("it should throw an error if password is <6 chars", () => {
    expect(() => validatePassword("123")).to.throw(
      "The password must be six characters or longer"
    );
  });
  it("it should accept password otherwise (happy path)", () => {
    expect(() => validatePassword("123456")).not.to.throw();
  });
});
