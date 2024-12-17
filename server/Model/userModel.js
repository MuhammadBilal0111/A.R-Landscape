const mongoose = require("mongoose");
const validator = require("validator");
const bycryptjs = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is a required field"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Email is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password and confirm password does not match",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    photo: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=740",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bycryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.comparePasswordInDB = async function (password, passwordDB) {
  return await bycryptjs.compare(password, passwordDB);
};
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
