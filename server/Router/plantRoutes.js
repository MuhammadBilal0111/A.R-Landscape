const express = require("express");
const plantController = require("../Controller/plantController");
const plantRouter = express.Router();

plantRouter.route("/getPlants").get(plantController.getPlants);
plantRouter.route("/addPlant").get(plantController.addPlant);

module.exports = plantRouter;
