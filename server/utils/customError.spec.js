const { expect } = require("chai");

const CustomError = require("./customError");

describe("#CustomError()", () => {
  it("it should extend the given arg, set status to 500 when given an Error instance", async () => {
    const error = new Error("Error message");
    expect(new CustomError(error).json()).to.eql({
      message: "Unexpected error occured",
      status: 500,
      stack: undefined,
      metadata: undefined,
    });
  });
  it("it should apply the given arg as the error message, set status to 400 when given a str", async () => {
    expect(new CustomError("Error message").json()).to.eql({
      message: "Error message",
      status: 400,
      stack: undefined,
      metadata: undefined,
    });
  });
  it("it should destruct and apply the {message, status, metadata} when given an obj", async () => {
    expect(
      new CustomError({
        message: "Unauthorized request",
        status: 401,
        metadata: {
          sub: 1234,
        },
      }).json()
    ).to.eql({
      message: "Unauthorized request",
      status: 401,
      stack: undefined,
      metadata: {
        sub: 1234,
      },
    });
  });
});
