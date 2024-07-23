// // controllers/chatController.js
// const Chat = require("../models/ChatModel");
// const Message = require("../models/messageModel")
// const createError = require("../utils/appError");

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const { members } = req.body;

    // Check if chat with same members already exists
    let chat = await Chat.findOne({ members: { $all: members, $size: members.length } });

    if (chat) {
      return res.status(200).json({ status: "success", chat });
    }

    chat = new Chat({ members });
    await chat.save();

    res.status(201).json({
      status: "success",
      chat,
    });
  } catch (err) {
    console.error("Error creating chat:", err);
    next(new createError("Internal server error", 500));
  }
};

// Get all chats for a user
exports.getUserChats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ members: userId })
      .populate("members", "user")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      status: "success",
      chats,
    });
  } catch (err) {
    console.error("Error getting user chats:", err);
    next(new createError("Internal server error", 500));
  }
};

// Get a single chat
exports.getChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId)
      .populate("members", "user")
      .populate("lastMessage");

    if (!chat) {
      return next(new createError("Chat not found", 404));
    }

    res.status(200).json({
      status: "success",
      chat,
    });
  } catch (err) {
    console.error("Error getting chat:", err);
    next(new createError("Internal server error", 500));
  }
};
