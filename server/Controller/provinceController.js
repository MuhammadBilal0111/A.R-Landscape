const CustomError = require("../utils/customError.js");
const Province = require("./../Model/provinceModel.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");

exports.getAllProvince = asyncErrorHandler(async (req, res, next) => {
  const provinces = await Province.find();
  res.status(200).json(provinces);
});
// update the price of
exports.updatePrice = asyncErrorHandler(async (req, res, next) => {
  const { name, price } = req.body;
  if (!name || price === undefined || price === null || price < 0) {
    return next(new CustomError("Invalid province name or price value", 404));
  }
  const updatedProvince = await Province.findOneAndUpdate(
    { name },
    { price },
    { new: true }
  );
  res.status(200).json({
    message: `Price of province ${name} has been updated successfully!`,
    updatedProvince,
  });
});
