const express = require("express");
const router = express.Router();
const { createCat, getCategories } = require("../controllers/categories");

router.route("/").get(getCategories).post(createCat);

module.exports = router;
