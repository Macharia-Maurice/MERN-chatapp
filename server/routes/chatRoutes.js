// routes/chatRoutes.js
const express = require("express");
const { authenticateToken } = require("../middleware/accessTokenAuthMiddleware");
const { createChat, getUserChats, getChat } = require("../controllers/chatController");

const router = express.Router();

// Protect all routes
router.use(authenticateToken);

// Create a new chat
router.post("/", createChat);
// Get all chats for a user
router.get("/", getUserChats);
// Get a single chat
router.get("/:id", getChat);

module.exports = router;
