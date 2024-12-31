const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is non-negative
  },
});

const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;
