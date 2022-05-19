const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const verifyToken = require("../middleware/auth");
const multer = require("multer");
const upload = multer({});
// @route GET api/posts
router.get("/", async (req, res) => {
  try {
    const getAll = await Category.find();
    res.json(getAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
router.post("/", upload.single("img"), async (req, res) => {
  const dataCategory = JSON.parse(req.body.name);
  const { name } = dataCategory;
  // console.log(dataCategory);
  const img =
    "data:image/jpeg;base64," + new Buffer(req.file.buffer).toString("base64");
  try {
    const newCategory = new Category({
      name,
      img,
    });
    await newCategory.save();
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
router.put("/:id", verifyToken, async (req, res) => {
  const { name } = req.body;
  try {
    let updateCategory = {
      name: name,
    };
    const categoryUpdateCondition = { _id: req.params.id };
    updateCategory = await Category.findOneAndUpdate(
      categoryUpdateCondition,
      updateCategory,
      { new: true }
    );
    res.json(updateCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const categoryDeleteCondition = { _id: req.params.id };
    const deletedCategory = await Category.findOneAndDelete(
      categoryDeleteCondition
    );
    if (!deletedCategory)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    const listCategory = await Category.find();
    res.json({ success: true, Category: listCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const getCategory = { _id: req.params.id };
    const getCurrentCategory = await Category.findOne(getCategory);
    res.json(getCurrentCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
