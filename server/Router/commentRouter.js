const express = require("express");
const commentRouter = express.Router();
const commentController = require("../Controller/commentController");

commentRouter.route("/create").post(commentController.createComment);
commentRouter
  .route("/get-comments/:id")
  .get(commentController.getComments);
module.exports = commentRouter;
