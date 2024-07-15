require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions.js");
const connectDB = require("./config/DBConnect.js");
const authRouter = require("./routes/authRoutes");
const userProfileRouter = require("./routes/userprofileRoutes.js")

const app = express();

connectDB();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth", authRouter);
app.use('/profile', userProfileRouter)

// global error handler
app.use(errorHandler);

// listen to port once connection to mongodb is successful
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  // server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// listen for mongodb connection error
mongoose.connection.on("error", (err) => {
  console.log(err);
});

