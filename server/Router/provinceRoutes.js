const express = require("express");
const provinceRouter = express.Router();
const provinceController = require("../Controller/provinceController");

provinceRouter
  .route("/")
  .get(provinceController.getAllProvince)
  .put(provinceController.updatePrice);

module.exports = provinceRouter;
