// routes/messageRoutes.js
const express = require("express");
const { authenticateToken } = require("../middleware/accessTokenAuthMiddleware");
const { sendMessage, getChatMessages, markAsSeen } = require("../controllers/messageController");

const router = express.Router();

// Protect all routes
router.use(authenticateToken);

//send msg
router.post("/", sendMessage);

//get all messages for a chat
router.get("/:chatId", getChatMessages);

//mark message as seen
router.patch("/:messageId/seen", markAsSeen);

module.exports = router;
