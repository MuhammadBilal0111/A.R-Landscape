const express = require("express");
const orderRouter = express.Router();
const orderController = require("../Controller/orderController");
const verifyUsers = require("./../utils/verifyUsers");

orderRouter.route("/orders").post(verifyUsers, orderController.placeOrder);
orderRouter.route("/orders").get(verifyUsers, orderController.getAllOrders);
orderRouter
  .route("/orders/:id")
  .put(verifyUsers, orderController.orderCompleted);

module.exports = orderRouter;
