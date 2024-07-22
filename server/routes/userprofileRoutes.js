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


//protect routes
router.use(authenticateToken)

router.route('/')
    // List all profiles
    .get(listAllProfiles)
    // Update user profile
    .patch(updateUserProfile);

// Update user profile picture
router.patch("/picture", upload.single("profilePicture"), updateUserProfilePicture);

// Get current logged in user profile
router.get("/me", getUserProfile);



module.exports = router;