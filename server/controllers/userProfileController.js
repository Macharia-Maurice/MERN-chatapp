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


// update the userProfile
exports.updateUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  console.log("Authenticated User ID:", userId);
  const { profilePicture } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return next(new createError("user profile not found", 404));
    }

    if (profilePicture) {
      userProfile.profilePicture = profilePicture;
    }

    await userProfile.save();

    res.status(200).json({
      status: "success",
      message: "User profile updated successfully",
      userProfile,
    });
  } catch (err) {
    console.error("Update userProfile error:", err);
    next(new createError("internal server error", 500));
  }
};
