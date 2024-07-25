// routes/messageRoutes.js
const express = require("express");
const { authenticateToken } = require("../middleware/accessTokenAuthMiddleware");
const { sendMessage, getAllMessages, seenBy } = require("../controllers/messageController");

const router = express.Router();

// Protect all routes
router.use(authenticateToken);

// Send a message to a specific chat
router.post("/:chat_id", sendMessage);

// Get all messages for a specific chat
router.get("/:chat_id", getAllMessages);

// Mark message as seen
router.patch("/:message_id/seen", seenBy);

module.exports = router;
