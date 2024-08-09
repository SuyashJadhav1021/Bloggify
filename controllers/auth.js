const User = require("../models/users");
const { BadRequest, Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({ user: newUser, token });
};

const login = async (req, res) => {
  const { username } = req.body;
  const pass = req.body.password;
  if (!username || !pass) {
    throw new BadRequest("Please provide username and password");
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    throw new Unauthenticated("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(pass);

  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid credentials");
  }
  const { password, ...others } = user._doc;

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ others, token });
};

module.exports = { register, login };
