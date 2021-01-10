const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// access at localhost:3000/posts
// GET back all the posts
router.get("/", async (req, res) => {
  try {
    // retrieve all the data from the database
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

// Submit a post
router.post("/", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  // Save to database
  const savedPost = await post.save();
  try {
    res.json(savedPost);
  } catch (err) {
    res.json(err);
  }
});

// Specific post
router.get("/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  try {
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json(err);
  }
});

// Update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
