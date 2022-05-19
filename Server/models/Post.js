const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "ONE_STAR",
      "TWO_STAR",
      "THREE_STAR",
      "FOUR_STAR",
      "FIVE_STAR",
      "NO_RATE",
    ],
  },
  classify: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  id: {
    type: String,
  },
  img: {
    type: String,
  },
  comments: [
    {
      text: {
        type: String,
      },
      vote: {
        type: String,
        enum: [
          "ONE_STAR",
          "TWO_STAR",
          "THREE_STAR",
          "FOUR_STAR",
          "FIVE_STAR",
          "NO_RATE",
        ],
      },
    },
  ],
});

module.exports = mongoose.model("posts", productSchema);
