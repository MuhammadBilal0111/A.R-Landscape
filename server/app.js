const express = require("express");
const plantRoutes = require("./Router/itemRoutes");
const orderRoutes = require("./Router/orderRoutes");
const authRouter = require("./Router/authRoutes");
const provinceRoutes = require("./Router/provinceRoutes");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/items", plantRoutes);
app.use("/api/auth", authRouter);
app.use("/api", orderRoutes);
app.use("/api/province", provinceRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "fail";
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    status,
    statusCode,
    message,
  });
});
module.exports = app;
