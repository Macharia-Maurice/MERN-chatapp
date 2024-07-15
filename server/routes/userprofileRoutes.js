const express = require("express");
const {
  authenticateToken,
} = require("../middleware/accessTokenAuthMiddleware");
const {
  listAllProfiles,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userProfileController");
const router = express();


router.get("/", authenticateToken, listAllProfiles);
// current logged in user
router.get("/me", authenticateToken, getUserProfile);
router.patch("/update", authenticateToken, updateUserProfile);

module.exports = router;
