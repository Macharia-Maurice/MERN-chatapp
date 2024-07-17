const UserProfile = require("../models/userProfileModel");
const createError = require("../utils/appError");

// List all user profiles with pagination
exports.listAllProfiles = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Count total profiles
    const total = await UserProfile.countDocuments();

    // Find profiles
    const profiles = await UserProfile.find()
      .populate("user", "username email") // Populate only necessary fields
      .select("-__v") // Exclude the version key
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      status: "success",
      data: {
        profiles,
        currentPage: page,
        totalPages,
        totalProfiles: total,
      },
    });
  } catch (err) {
    console.error("Error listing profiles:", err);
    next(new createError("Internal server error", 500));
  }
};


// for current logged in user
exports.getUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  console.log("Authenticated User ID:", userId);
  try {
    const userProfile = await UserProfile.findOne({ user: userId }).populate(
      "user"
    );

    if (!userProfile) {
      return next(new createError("User profile not found", 404));
    }

    res.status(200).json({
      status: "success",
      userProfile,
    });
  } catch (err) {
    console.error("Error getting user profile:", err);
    next(new createError("Internal server error", 500));
  }
};



// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { bio } = req.body;

    // Update profile in database
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: req.user.id },
      { bio },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile picture
exports.updateUserProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = req.file;

    // Update profile picture path or data in database
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: req.user.id },
      { profilePicture: req.file.path },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};
