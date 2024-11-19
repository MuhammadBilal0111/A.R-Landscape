const PlantModel = require("../Model/plantModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getPlants = asyncErrorHandler(async (req, res, next) => {
  const plantData = await PlantModel.find().sort({ dateAdded: -1 }); // -1 for desc
  res.status(200).json({
    status: "success",
    data: plantData,
  });
});
exports.addPlant = asyncErrorHandler(async (req, res, next) => {
  const plantData = await PlantModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: plantData,
  });
});
