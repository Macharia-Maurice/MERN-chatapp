const UserProfile = require("../models/userProfileModel");
const createError = require("../utils/appError");
const fs = require("fs");
const path = require("path");

// List all user profiles with pagination
exports.listAllProfiles = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        // Get the current user ID from the request (assuming it's available in req.user.id)
        const currentUserId = req.user.id;

        // Count total profiles excluding the current user
        const total = await UserProfile.countDocuments({ user: { $ne: currentUserId } });

        // Find profiles excluding the current user
        const profiles = await UserProfile.find({ user: { $ne: currentUserId } })
            .populate("user", "email first_name last_name") // Populate only necessary fields
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
exports.getMyProfile = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const userProfile = await UserProfile.findOne({ user: userId })
			.populate("user", "email first_name last_name")
			.select("-__v");

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

// Get a user profile given the id
exports.getUserProfile = async (req, res, next) => {
  const profileId = req.params.profile_id;

  try {
    const userProfile = await UserProfile.findById(profileId)
      .populate("user", "email first_name last_name")
      .select("-__v");

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
}

// Update user profile
exports.updateUserProfile = async (req, res) => {
	try {
		const { bio } = req.body;

		// Update profile in database
		const updatedProfile = await UserProfile.findOneAndUpdate(
			{ user: req.user.id },
			{ bio },
			{ new: true }
		).populate("user", "email first_name last_name").select("-__v");

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
exports.updateUserProfilePicture = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const userProfile = await UserProfile.findOne({ user: userId })
			.populate("user", "email first_name last_name")
			.select("-__v");

		if (!userProfile) {
			// Delete the uploaded file if user profile is not found
			fs.unlinkSync(req.file.path);
			return res.status(404).json({ message: "User profile not found" });
		}

		userProfile.profilePicture = req.file.path;
		await userProfile.save();

		res.status(200).json({
			message: "Profile picture updated successfully",
			userProfile,
		});
	} catch (err) {
		console.error(err);
		// Delete the uploaded file in case of an error
		if (req.file && req.file.path) {
			fs.unlinkSync(req.file.path);
		}
		next(err);
	}
};
