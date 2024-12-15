const Order = require("../Model/orderModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customErrorHandler = require("../utils/customError");
// const adminNotificationService = require("../services/adminNotificationService");

// Place a new order
exports.placeOrder = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const {
    products,
    email,
    address,
    fullName,
    phoneNumber,
    totalPrice,
    specialInstructions,
  } = req.body;

  // // Validate required fields
  if (!products || !email || !fullName || !address || !phoneNumber) {
    return next(new customErrorHandler("Missing required fields."));
  }
  const savedOrder = await Order.create(req.body);
  console.log(savedOrder);

  // Notify the admin in real-time
  // // adminNotificationService.notifyAdmin(`New order placed: ${savedOrder._id}`);

  // res.status(201).json({ message: "Order placed successfully.", order: savedOrder });
});
