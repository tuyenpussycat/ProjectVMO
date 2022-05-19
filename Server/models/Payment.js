const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  numberPhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
  },
  name: {
    type: Array,
  },
  quantity: {
    type: Array,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
