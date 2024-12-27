const Order = require("../Model/orderModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customErrorHandler = require("../utils/customError");
const sendEmail = require("./../utils/email");
// Place a new order
exports.placeOrder = asyncErrorHandler(async (req, res, next) => {
  const {
    products,
    email,
    address,
    username,
    phoneNumber,
    status,
    totalPrice,
    shippingCost,
    specialInstructions,
  } = req.body;
  console.log(req.body);
  // Validate required fields
  if (
    !products ||
    !email ||
    !username ||
    !address ||
    !phoneNumber ||
    !status ||
    !shippingCost
  ) {
    return next(new customErrorHandler("Missing required fields.", 404));
  }
  // Save the order to the database
  const savedOrder = await Order.create(req.body);

  try {
    await sendEmail({
      _id: savedOrder._id,
      username: savedOrder.username,
      shippingCost: savedOrder.shippingCost,
      totalPrice: savedOrder.totalPrice,
      orderItems: savedOrder.products,
      email: savedOrder.email,
    });
  } catch (err) {
    console.log(err);
    next(
      new customErrorHandler(
        "There was an error in sending confirmation email! Please try again later",
        500
      )
    );
  }
  // Emit the orderPlaced event using the io instance
  const io = req.app.get("io");

  io.emit("orderPlaced", savedOrder); // Broadcast to all connected clients

  res.status(201).json({
    message: "Order placed successfully. Check your Email for confirmation",
    order: savedOrder,
  });
});

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const status = req.query.status; // Get status from query parameters

  console.log(status);
  // If a status is provided, filter orders by status
  const filter = status ? { status: status } : {};
  const orderDetails = await Order.find(filter).sort({ createdAt: -1 });
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
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $set: { status: "completed" } },
    { new: true }
  );
  // If the order is not found
  if (!updatedOrder) {
    return res.status(404).json({
      status: "failed",
      message: "Order not updating",
    });
  }
  const orderDetails = await Order.find({ status: "pending" }).sort({
    createdAt: -1,
  });
  console.log(orderDetails);
  const io = req.app.get("io");
  io.emit("updatedOrder", orderDetails);

  // Return success response
  res.status(200).json({
    status: "success",
    message: "Order completed successfully",
  });
});
