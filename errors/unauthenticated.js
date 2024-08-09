const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../errors/costum-error");

class Unauthenticated extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
