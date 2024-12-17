const express = require("express");
const userController = require("../Controller/authController");
const userRoute = express.Router();

userRoute.route("/signUp").post(userController.signUp); // route for sign up user
userRoute.route("/signIn").post(userController.signIn); // route for sign in user

module.exports = userRoute;
