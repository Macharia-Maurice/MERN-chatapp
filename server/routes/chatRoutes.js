// routes/chatRoutes.js
const express = require("express");
const {
	authenticateToken,
} = require("../middleware/accessTokenAuthMiddleware");
const {
	createChat,
	getUserChats,
	getChat,
} = require("../controllers/chatController");

const router = express.Router();

// Protect all routes
router.use(authenticateToken);

router
	.route("/")
	// Create a new chat
	.post(createChat)
	// Get all chats for user (current logged in)
	.get(getUserChats);

// Get a single chat
router.get("/:chat_id", getChat);

module.exports = router;
