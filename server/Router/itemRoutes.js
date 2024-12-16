const express = require("express");
const itemController = require("../Controller/itemController");
const plantRouter = express.Router();

plantRouter.route("/getItems").get(itemController.getItems);
plantRouter.route("/add-items").post(itemController.addItem);

module.exports = plantRouter;
