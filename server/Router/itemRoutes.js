const express = require("express");
const itemController = require("../Controller/itemController");
const verifyUsers = require("./../utils/verifyUsers");
const plantRouter = express.Router();

plantRouter.route("/getItems").get(itemController.getItems);
plantRouter.route("/:id").get(itemController.fetchItemsById);
plantRouter.route("/add-items").post(verifyUsers, itemController.addItem);
plantRouter.route("/editItems/:id").put(verifyUsers, itemController.editItems);
plantRouter
  .route("/deleteItems/:id")
  .delete(verifyUsers, itemController.deleteItems);

module.exports = plantRouter;
