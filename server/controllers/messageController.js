// controllers/messageController.js
const Message = require("../models/messageModel");
const UserProfile = require("../models/userProfileModel");
const Chat = require("../models/chatModel");
const createError = require("../utils/appError");

// Send a message
exports.sendMessage = async (req, res, next) => {
  try {
    const chatId = req.params.chat_id;
    const { text, replyTo } = req.body; // Adjusted to use 'text' instead of 'content'

    const userId = req.user.id;
    const userProfile = await UserProfile.findOne({ user: userId });
    const sender = userProfile._id;

    // Verify the user is a member of the chat
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(createError(404, "Chat not found"));
    }

    if (!chat.members.includes(userProfile._id.toString())) {
      return next(createError(403, "User is not a member of the chat"));
    }

    const message = new Message({
      chatId,
      sender,
      text, // Use 'text' from the request body
      replyTo,
    });
    await message.save();

    // Update last message in chat
    chat.lastMessage = message._id;
    await chat.save();

    res.status(201).json({
      status: "success",
      message,
      chat,
    });
  } catch (err) {
    console.error("Error sending message:", err);
    next(createError(500, "Internal server error"));
  }
};

// Get all messages for a specific chat
exports.getAllMessages = async (req, res, next) => {
  const chatId = req.params.chat_id;
  try {
    // Verify the chat exists
    const chat = await Chat.findById(chatId)
      .populate("members", "user")
      .populate("lastMessage");

    if (!chat) {
      return next(new createError("Chat not found", 404));
    }

    // Find all messages for the chat
    const messages = await Message.find({ chatId: chatId })
      .populate("sender", "user") // Populate sender details
      .populate("replyTo", "content sender") // Populate replyTo details if needed
      .sort({ createdAt: 1 }); // Sort messages by creation date, oldest first

    res.status(200).json({
      status: "success",
      data: {
        chat,
        messages,
      },
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    next(new createError("Internal server error", 500));
  }
};

// Mark message as seen by receiver
exports.seenBy = async (req, res, next) => {
  try {
    const messageId = req.params.message_id;
    const userId = req.user.id; // user ID obtained from the authenticated token

    const userProfile = await UserProfile.findOne({ user: userId });

    const message = await Message.findById(messageId);

    if (!message) {
      return next(new createError("Message not found", 404));
    }

    // Check if the logged-in user is the sender of the message
    if (message.sender.toString() === userProfile._id.toString()) {
      return next(
        new createError("Sender cannot mark the message as seen", 403)
      );
    }

    // Check if the user is a member of the chat
    const chat = await Chat.findById(message.chatId);

    if (!chat) {
      return next(new createError("Chat not found", 404));
    }

    if (!chat.members.includes(userProfile._id.toString())) {
      return next(new createError("Only chat members can mark the message as seen", 403));
    }

    // Add user profile ID to the seenBy array if not already present
    if (!message.seenBy.includes(userProfile._id.toString())) {
      message.seenBy.push(userProfile._id.toString());
      await message.save();
    }

    res.status(200).json({
      status: "success",
      message,
    });
  } catch (err) {
    console.error("Error marking message as seen:", err);
    next(new createError("Internal server error", 500));
  }
};

// Delete all messages in a chat
exports.deleteAllMessages = async (req, res, next) => {
  const chatId = req.params.chat_id;
  try {
    // Verify the chat exists
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(createError(404, "Chat not found"));
    }

    // Verify the user is a member of the chat
    const userId = req.user.id;
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!chat.members.includes(userProfile._id.toString())) {
      return next(createError(403, "User is not a member of the chat"));
    }

    // Delete all messages associated with the chat
    await Message.deleteMany({ chatId: chatId });

    res.status(204).send(); // No content to send
  } catch (err) {
    console.error("Error deleting messages:", err);
    next(createError(500, "Internal server error"));
  }
};