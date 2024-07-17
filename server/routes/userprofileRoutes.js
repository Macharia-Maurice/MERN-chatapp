const express = require("express");
const { authenticateToken } = require("../middleware/accessTokenAuthMiddleware");
const { listAllProfiles, getUserProfile, updateUserProfile, updateUserProfilePicture } = require("../controllers/userProfileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// List all profiles
router.get("/", authenticateToken, listAllProfiles);

// Update user profile
router.patch("/", authenticateToken, updateUserProfile);

// Update user profile picture
router.patch("/picture", authenticateToken, upload.single("profilePicture"), updateUserProfilePicture);

// Get current logged in user profile
router.get("/me", authenticateToken, getUserProfile);

module.exports = router;
