const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError.js");
const User = require("./../Model/userModel.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");

// generate jwt token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
// response when user sign up or sign in
const createSendendResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  const options = {
    maxAge: process.env.LOGIN_EXPIRES,
    httpOnly: true,
  };
  const { password, ...userInfo } = user._doc;
  res.cookie("jwt", token, options);
  res.status(statusCode).json({
    status: "success",
    token,
    userInfo,
  });
};
// sign up functionality
exports.signUp = asyncErrorHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  createSendendResponse(user, 201, res);
});
// sign in functionality
exports.signIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please Enter Email and password", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("No User found! Please Sign Up", 404));
  }
  if (!(await user.comparePasswordInDB(password, user.password))) {
    return next(new CustomError("Incorrect Password!", 403));
  }
  createSendendResponse(user, 201, res);
});
