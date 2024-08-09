const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/user");

router.route("/").get(getAllUser);
router
  .route("/:id")
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser)
  .get(getUser);

module.exports = router;
