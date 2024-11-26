const PlantModel = require("../Model/plantModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getPlants = asyncErrorHandler(async (req, res, next) => {
  const startIndex = req.query.startIndex * 1 || 0;
  const limit = req.query.limit * 1 || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  console.log(req.query.slug);
  const toFind = {
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.category && { category: req.query.category }),
  };
  const plantData = await PlantModel.find(toFind)
    .sort({ dateAdded: sortDirection })
    .limit(limit)
    .skip(startIndex); // -1 for desc
  
  const totalPosts = await PlantModel.countDocuments();
  res.status(200).json({
    status: "success",
    data: plantData,
    totalPosts,
  });
});
exports.addPlant = asyncErrorHandler(async (req, res, next) => {
  const plantData = await PlantModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: plantData,
  });
});
