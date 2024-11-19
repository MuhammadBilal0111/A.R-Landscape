const express = require("express");
const plantRoutes = require("./Router/plantRoutes");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/plants", plantRoutes);

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
