const PlantModel = require("../Model/plantModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getPlants = asyncErrorHandler(async (req, res, next) => {
  const startIndex = req.query.startIndex * 1 || 0;
  const limit = req.query.limit * 1 || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const plantData = await PlantModel.find()
    .sort({ dateAdded: sortDirection })
    .limit(limit)
    .skip(startIndex); // -1 for desc
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
