const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const socket = require("socket.io"); // for real time order generating
const port = process.env.PORT;

const server = http.createServer(app);
const io = socket(server);
console.log(process.env.CONN_STR);
mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("Database connection has been established");
  })
  .catch((err) => {
    console.log("Problem in connecting with the database", err);
  });

server.listen(port, () => {
  console.log("Server has been started on http://localhost:3000");
});
