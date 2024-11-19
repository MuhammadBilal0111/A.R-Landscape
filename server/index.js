const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT;
console.log(process.env.CONN_STR);
mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("Database connection has been established");
  })
  .catch((err) => {
    console.log("Problem in connecting with the database", err);
  });

app.listen(port, () => {
  console.log("Server has been started on http://localhost:3000");
});
