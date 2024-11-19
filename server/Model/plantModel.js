const mongoose = require("mongoose");

const plantSchema = mongoose.Schema({
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
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const plantModel = mongoose.model("Plant", plantSchema);
module.exports = plantModel;