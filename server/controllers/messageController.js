const Message = require("../models/messageModel");
const UserProfile = require("../models/userProfileModel");
const Chat = require("../models/chatModel");
const CreateError = require("../utils/appError");

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
      return next(new CreateError("Chat not found", 404));
    }

    if (!chat.members.includes(userProfile._id.toString())) {
      return next(new CreateError("User is not a member of the chat", 403));
    }

    const message = new Message({
      chatId,
      sender,
      text,
      replyTo,
    });
    await message.save();
    console.log("Saved message:", message);

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
    next(new CreateError("Internal server error", 500));
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
      return next(new CreateError("Chat not found", 404));
    }

    // Retrieve the user profile of the authenticated user
    const userId = req.user.id;
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return next(new CreateError("User profile not found", 404));
    }

    // Find all messages for the chat
    const messages = await Message.find({ chatId: chatId })
      .populate("sender", "user") // Populate sender details
      .populate("replyTo", "text sender") // Populate replyTo details if needed
      .sort({ createdAt: 1 }); // Sort messages by creation date, oldest first

    // Add position field to each message
    const updatedMessages = messages.map((message) => {
      const position = message.sender.equals(userProfile._id) ? "right" : "left";
      return {
        ...message.toObject(),
        position,
      };
    });

    res.status(200).json({
      status: "success",
      data: {
        chat,
        messages: updatedMessages,
      },
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    next(new CreateError("Internal server error", 500));
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
      return next(new CreateError("Message not found", 404));
    }

    // Check if the logged-in user is the sender of the message
    if (message.sender.toString() === userProfile._id.toString()) {
      return next(new CreateError("Sender cannot mark the message as seen", 403));
    }

    // Check if the user is a member of the chat
    const chat = await Chat.findById(message.chatId);

    if (!chat) {
      return next(new CreateError("Chat not found", 404));
    }

    if (!chat.members.includes(userProfile._id.toString())) {
      return next(new CreateError("Only chat members can mark the message as seen", 403));
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
    next(new CreateError("Internal server error", 500));
  }
};

// Delete all messages in a chat
exports.deleteAllMessages = async (req, res, next) => {
  const chatId = req.params.chat_id;
  try {
    // Verify the chat exists
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(new CreateError("Chat not found", 404));
    }

    // Verify the user is a member of the chat
    const userId = req.user.id;
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!chat.members.includes(userProfile._id.toString())) {
      return next(new CreateError("User is not a member of the chat", 403));
    }

    // Delete all messages associated with the chat
    await Message.deleteMany({ chatId: chatId });

    res.status(204).send(); // No content to send
  } catch (err) {
    console.error("Error deleting messages:", err);
    next(new CreateError("Internal server error", 500));
  }
};
