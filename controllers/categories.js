const Category = require("../models/categories");
const { StatusCodes } = require("http-status-codes");

const createCat = async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json(newCategory);
};

const getCategories = async (req, res) => {
  const cat = await Category.find();
  res.status(StatusCodes.OK).json(cat);
};

module.exports = { createCat, getCategories };
