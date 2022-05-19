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
router.post("/", async (req, res) => {
  const { numberPhone, address, total, name, quantity } = req.body;
  try {
    const newPayment = new Payment({
      numberPhone,
      address,
      total,
      name,
      quantity,
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

// @route DELETE api/posts
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const paymentDeleteCondition = { _id: req.params.id };
    const deletedPayment = await Payment.findOneAndDelete(
      paymentDeleteCondition
    );
    if (!deletedPayment)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    const listPayment = await Payment.find();
    res.json({ success: true, Payment: listPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
