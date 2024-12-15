const express = require("express");
const orderRouter = express.Router();
const orderController = require("../Controller/orderController");

orderRouter.post("/orders", orderController.placeOrder);

module.exports = orderRouter;
