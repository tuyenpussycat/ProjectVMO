const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const multer = require("multer");
const upload = multer({});

const Post = require("../models/Post");
const User = require("../models/User");
const PAGE_SIZE = 15;
// @route GET api/posts

router.get("/", async (req, res) => {
  var query = { ...req.query };
  if (query.title) {
    query.title = { $regex: ".*" + query.title + ".*" };
  }

  delete query.page;
  delete query.sort;
  var { page, sort } = req.query;

  if (page) {
    page = parseInt(page);

    let start = (page - 1) * PAGE_SIZE;
    try {
      const count = await Post.countDocuments({});
      const posts = await Post.find(query)
        .skip(start)
        .limit(PAGE_SIZE)
        .sort(sort);
      const user = await User.find({ _id: req.userId });
      // console.log(req.userId);
      let pageLimit;
      if (count % PAGE_SIZE === 0) {
        pageLimit = count / PAGE_SIZE;
      } else {
        pageLimit = Math.floor(count / PAGE_SIZE) + 1;
      }
      // console.log(pageLimit);
      res.json({ success: true, posts, user, page, pageLimit });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getPost = { _id: req.params.id };
    const getCurrentPost = await Post.findOne(getPost);
    res.json(getCurrentPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts

router.post("/", upload.single("img"), async (req, res) => {
  const dataOrder = JSON.parse(req.body.dataOrder);
  const { title, description, status, classify, price, quantity, id } =
    dataOrder;
  const img =
    "data:image/jpeg;base64," + new Buffer(req.file.buffer).toString("base64");
  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title,
      description,
      img,
      status: status || "NO_RATE",
      classify: classify || "Other",
      price: price || 0,
      quantity: quantity,
      id: id,
    });

    await newPost.save();

    res.json({ success: true, post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts

router.put("/:id", async (req, res) => {
  const { title, description, status, classify, price, quantity } = req.body;
  console.log(req.body);
  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description,
      status: status || "NO_RATE",
      classify: classify || "Other",
      price: price || 0,
      quantity: quantity,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts

router.delete("/delete/:id", async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    // const listPost = await Post.find();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
