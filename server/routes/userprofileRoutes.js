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

// router.get("/", authenticateToken, listAllProfiles);
// router.patch("/", authenticateToken, updateUserProfile);

router
  .route("/")
  .get(authenticateToken, listAllProfiles)
  .patch(authenticateToken, updateUserProfile);

// current logged in user
router.get("/me", authenticateToken, getUserProfile);

module.exports = router;
