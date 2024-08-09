const express = require("express");
const authMiddleware = require("../middleware/authentication");

const router = express.Router();
const {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getAllPost,
} = require("../controllers/posts");

router.route("/").post(authMiddleware, createPost).get(getAllPost);
router
  .route("/:id")
  .get(getPost)
  .put(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

module.exports = router;
