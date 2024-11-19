const PlantModel = require("../Model/plantModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
exports.getPlants = async () => {
  console.log("luv u");
};
exports.addPlant = asyncErrorHandler(async (req, res, next) => {
  const plantData = await PlantModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: plantData,
  });
});
