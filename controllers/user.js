const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const {
    user: { userId },
    body: { id },
  } = req;
  if (userId === id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updateUser) {
      throw new NotFound(`No user with id ${id}`);
    }
    const token = updateUser.createJWT();
    res.status(StatusCodes.OK).json({ user: updateUser, token });
  }
};

const deleteUser = async (req, res) => {
  const {
    user: { userId },
    headers: { id },
  } = req;
  if (userId === id) {
    const deleteUser = await User.findByIdAndDelete({ _id: id });

    if (!deleteUser) {
      throw new NotFound(`No user with id ${id}`);
    }
    res.status(StatusCodes.OK).send();
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new NotFound(`No user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
};

module.exports = { updateUser, deleteUser, getUser, getAllUser };
