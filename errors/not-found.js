const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../errors/costum-error");

class NotFound extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
