const express = require("express");
const { authenticateToken } = require("../middleware/accessTokenAuthMiddleware");
const { listAllProfiles, getUserProfile, updateUserProfile, updateUserProfilePicture } = require("../controllers/userProfileController");
const multer = require("multer");
const router = express.Router();
const path = require('path')

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'Images')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage})

// List all profiles
router.get("/", authenticateToken, listAllProfiles);

// Update user profile
router.patch("/", authenticateToken, updateUserProfile);

// Update user profile picture
router.patch("/picture", authenticateToken, upload.single("profilePicture"), updateUserProfilePicture);

// Get current logged in user profile
router.get("/me", authenticateToken, getUserProfile);

module.exports = router;
