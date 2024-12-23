const express = require("express");
const userController = require("../Controller/authController");
const verifyUsers = require("./../utils/verifyUsers");
const userRoute = express.Router();

userRoute.route("/signUp").post(userController.signUp); // route for sign up user
userRoute.route("/signIn").post(userController.signIn); // route for sign in user
userRoute.route("/signOut/:userId").post(verifyUsers, userController.signOut); // route for sign in user

module.exports = userRoute;
