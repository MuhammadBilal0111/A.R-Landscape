const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app"); // Express app
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3000;

// Create HTTP server and attach Express app
const httpServer = createServer(app);

// Initialize Socket.IO and attach to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Accept all origins for simplicity; adjust for production
    methods: ["GET", "POST"],
  },
});

// Store the io instance globally for real-time communication
app.set("io", io);

// MongoDB Connection
mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("Database connection has been established");
  })
  .catch((err) => {
    console.error("Problem in connecting with the database:", err);
  });

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
});

// Start the server
httpServer.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}`);
});

module.exports = io; // Optional, if needed in other files
