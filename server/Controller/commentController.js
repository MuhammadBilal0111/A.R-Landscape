const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Comment = require("../Model/commentModel");

// api to create comments
exports.createComment = asyncErrorHandler(async (req, res, next) => {
  const { content, productId, email, username } = req.body;
  const comment = await Comment.create({ content, productId, email, username });
  res.status(201).json({
    status: "success",
    comment,
  });
});
// api to get comments
exports.getComments = async (req, res, next) => {
  const productId = req.params.id;
  const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
  const totalComments = await Comment.countDocuments();
  res.status(200).json({
    status: "success",
    comments,
    totalComments,
  });
};
