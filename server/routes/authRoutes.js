const express = require("express");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/authControler");
const { authenticateToken } = require("../middleware/accessTokenAuthMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.post("/refresh-token", refreshToken);

module.exports = router;
