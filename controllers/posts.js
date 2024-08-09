const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const { Unauthenticated, NotFound } = require("../errors");

const createPost = async (req, res) => {
  const {
    user: { username },
  } = req;
  if (req.body.username === username) {
    const newPost = await Post.create(req.body);
    res.status(StatusCodes.CREATED).json(newPost);
  }
};

const deletePost = async (req, res) => {
  const {
    user: { username },
    params: { id: postId },
  } = req;
  if (username === req.headers.username) {
    const deletedPost = await Post.findByIdAndDelete({
      _id: postId,
    });
    if (!deletedPost) {
      throw new Unauthenticated("You can delete only your post");
    }
    res.status(StatusCodes.OK).send("Post has been deleted");
  }
};
const updatePost = async (req, res) => {
  const {
    user: { username },
    params: { id: postId },
  } = req;
  if (username === req.body.username) {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      req.body,
      { new: true }
    );
    res.status(StatusCodes.OK).json({ updatedPost });
  } else {
    throw new Unauthenticated("You can update only your post");
  }
};

const getPost = async (req, res) => {
  const {
    params: { id: postId },
  } = req;
  const post = await Post.findById({ _id: postId });
  if (!post) {
    throw new NotFound(`No user with ${postId}`);
  }
  res.status(StatusCodes.OK).json(post);
};

const getAllPost = async (req, res) => {
  const { username, category } = req.query;

  let post;
  if (username) {
    post = await Post.find({ username });
  } else if (category) {
    post = await Post.find({ categories: { $in: [category] } });
  } else {
    post = await Post.find({});
  }
  res.status(StatusCodes.OK).json({ post });
};

module.exports = { createPost, updatePost, deletePost, getPost, getAllPost };
