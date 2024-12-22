const ItemModel = require("../Model/itemModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

exports.getItems = asyncErrorHandler(async (req, res, next) => {
  const startIndex = req.query.startIndex * 1 || 0;
  const limit = req.query.limit * 1 || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  console.log(req.query.slug);
  const toFind = {
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.category && { category: req.query.category }),
  };
  const plantData = await ItemModel.find(toFind)
    .sort({ dateAdded: sortDirection })
    .limit(limit)
    .skip(startIndex); // -1 for desc

  const totalPosts = await ItemModel.countDocuments();
  res.status(200).json({
    status: "success",
    data: plantData,
    totalPosts,
  });
});
exports.addItem = asyncErrorHandler(async (req, res, next) => {
  const { category, description, title, price } = req.body;
  if (!category || !description || !title || !price) {
    return next(new CustomError("Fill all the fields", 404));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^A-Za-z0-9-]/g, "");
  const newPost = {
    ...req.body,
    slug,
  };
  const plantData = await ItemModel.create(newPost);
  res.status(200).json({
    status: "success",
    message: "Item added Successfully",
    data: plantData,
  });
});
exports.editItems = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const updatedItem = await ItemModel.findByIdAndUpdate(
    id,
    { name, category, price, imageUrl },
    { new: true } // Return the updated document
  );
  if (!updatedItem) {
    return next(new CustomError("Item not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: deletedItem,
    message: "Item deleted successfully",
  });
});
exports.deleteItems = asyncErrorHandler(async (req, res, next) => {
  const deletedItem = await ItemModel.findByIdAndDelete(Object(req.params.id));

  if (!deletedItem) {
    return next(new CustomError("Item not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: deletedItem,
    message: "Item deleted successfully",
  });
});
exports.fetchItemsById = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const item = await ItemModel.findById(id);
  if (!item) {
    return next(new CustomError("Item not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: item,
  });
});
