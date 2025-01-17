require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require('http');

const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions.js");
const connectDB = require("./config/DBConnect.js");
const authRouter = require("./routes/authRoutes");
const userProfileRouter = require("./routes/userprofileRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socketIO = require("./socket"); // Import the socketIO function

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = socketIO(server);

// Serve static files
app.use('/Images', express.static(path.join(__dirname, 'Images')));
connectDB();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use('/profiles', userProfileRouter);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

// Global error handler
app.use(errorHandler);

// Listen to port once connection to MongoDB is successful
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  // Start HTTP server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Listen for MongoDB connection error
mongoose.connection.on("error", (err) => {
  console.log(err);
});
