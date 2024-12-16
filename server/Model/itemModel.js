const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Plant title is a required field"],
  },
  description: {
    type: String,
  },
  category: {
    type: String, // indoor or outdoor
  },
  price: {
    type: Number,
    required: [true, "Plant price is a required field"],
  },
  stockQuantity: {
    type: Number,
    default: 1,
  },
  imageUrl: {
    type: [String],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;
