const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/authService");
const createError = require("../utils/appError");
const { verifyRefreshToken } = require("../services/authService");

// register user
exports.register = async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password)
    return next(new createError("Passwords do not match", 400));

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new createError("Enter a valid email", 400));

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "user registered successfully",
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    next(new createError("Server error", 500));
  }
};

// login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return next(new createError("Email and password are required", 400));
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new createError("Invalid credentials", 400));
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new createError("Invalid credentials", 400));
    }

    // generate JWT token for the user
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.status(201).json({
      status: "success",
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    console.error("Login Error:", err); // Log the error details
    next(new createError("Server error", 500));
  }
};

//logout user
exports.logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

// use refresh token to get new access token
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token found" });
  }

  try {
    const user = await verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken(user);
    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true });
    console.log("New access token issued:", newAccessToken);
    res.status(200).json({ status: "success", accessToken: newAccessToken });
  } catch (err) {
    console.error("Error verifying refresh token:", err);
    res.status(403).json({ error: "Failed to verify refresh token" });
  }
};
