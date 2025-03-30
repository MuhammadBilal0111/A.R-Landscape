const express = require("express");
const orderRouter = express.Router();
const orderController = require("../Controller/orderController");
const verifyUsers = require("./../utils/verifyUsers");

orderRouter.route("/orders").post(orderController.placeOrder);
orderRouter.route("/orders").get(orderController.getAllOrders);
orderRouter.route("/orders/:id").put(orderController.orderCompleted);

module.exports = orderRouter;
