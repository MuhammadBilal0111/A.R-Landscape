const Order = require("../Model/orderModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customErrorHandler = require("../utils/customError");

// Place a new order
exports.placeOrder = asyncErrorHandler(async (req, res, next) => {
  const {
    products,
    email,
    address,
    fullName,
    phoneNumber,
    totalPrice,
    specialInstructions,
  } = req.body;

  // Validate required fields
  if (!products || !email || !fullName || !address || !phoneNumber) {
    return next(new customErrorHandler("Missing required fields.", 404));
  }
  // Save the order to the database
  const savedOrder = await Order.create(req.body);

  // Emit the orderPlaced event using the io instance
  const io = req.app.get("io");

  io.emit("orderPlaced", savedOrder); // Broadcast to all connected clients

  res
    .status(201)
    .json({ message: "Order placed successfully.", order: savedOrder });
});

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orderDetails = await Order.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    data: orderDetails,
  });
});
exports.orderCompleted = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id; // Extract the ID from request parameters

  if (!id) {
    return res.status(400).json({
      status: "failed",
      message: "Order ID is required",
    });
  }

  // Find the order by ID and delete it
  const deletedOrder = await Order.findByIdAndDelete(id);
  // If the order is not found
  if (!deletedOrder) {
    return res.status(404).json({
      status: "failed",
      message: "Order not found",
    });
  }
  const orderDetails = await Order.find().sort({ createdAt: -1 }); // get all orders
  const io = req.app.get("io");
  io.emit("deleteOrder", orderDetails);

  // Return success response
  res.status(200).json({
    status: "success",
    message: "Order completed successfully",
  });
});
