const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const verifyToken = require("../middleware/auth");
// @route GET api/posts
router.get("/", verifyToken, async (req, res) => {
  try {
    const getAll = await Payment.find();
    res.json(getAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
router.post("/", verifyToken, async (req, res) => {
  const { numberPhone, address, total, list } = req.body;
  console.log(req.body);
  try {
    const newPayment = new Payment({
      numberPhone,
      address,
      total,
      list,
    });
    await newPayment.save();
    res.send(newPayment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// get
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const getPayment = { _id: req.params.id };
    const getCurrentPayment = await Payment.findOne(getPayment);
    res.json(getCurrentPayment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
