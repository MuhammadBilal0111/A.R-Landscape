const express = require("express");
const itemController = require("../Controller/itemController");
const plantRouter = express.Router();

plantRouter.route("/getItems").get(itemController.getItems);
plantRouter.route("/:id").get(itemController.fetchItemsById);
plantRouter.route("/add-items").post(itemController.addItem);
plantRouter.route("/editItems/:id").put(itemController.editItems);
plantRouter.route("/deleteItems/:id").delete(itemController.deleteItems);

module.exports = plantRouter;
