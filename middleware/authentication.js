const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { Unauthenticated } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Token invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    throw new Unauthenticated("Authentication invalid");
  }
};

module.exports = authMiddleware;
