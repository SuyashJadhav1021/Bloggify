const BadRequest = require("../errors/bad-request");
const NotFound = require("../errors/not-found");
const Unauthenticated = require("../errors/unauthenticated");
const customAPIError = require("../errors/costum-error");

module.exports = { BadRequest, NotFound, Unauthenticated, customAPIError };
