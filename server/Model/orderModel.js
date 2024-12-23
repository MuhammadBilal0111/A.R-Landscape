const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Full Name is a required field"],
    },
    email: { type: String, required: [true, "Email is a required field"] },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is a required field"],
    },
    address: {
      type: String,
      required: [true, "Address is a required field"],
    },
    products: {
      type: Object,
      required: [true, "Products is a required field"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"], // Allowed values
      required: true, // (Optional) Ensure the field is required
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is a required field"],
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("order", ProductSchema);
