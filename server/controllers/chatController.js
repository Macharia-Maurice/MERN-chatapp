// controllers/chatController.js
const Chat = require("../models/chatModel");
const UserProfile = require("../models/userProfileModel");
const Message = require("../models/messageModel")
const createError = require("../utils/appError");

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const { members } = req.body;

    // Check if chat with same members already exists
    let chat = await Chat.findOne({ members: { $all: members, $size: members.length } }).populate("lastMessage").select("-__v");

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

// Get all chats for a user (current logged-in user)
exports.getUserChats = async (req, res, next) => {
  try {
    const userId = req.user.id; // Authentication user ID
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({
        status: "fail",
        message: "UserProfile not found",
      });
    }

    const chats = await Chat.find({ members: userProfile._id })
      .populate({
        path: 'members',
        model: 'UserProfile',
        select: 'profilePicture bio user',
        populate: {
          path: 'user',
          model: 'User',
          select: 'first_name last_name'
        }
      })
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    // Format the chat response
    const formattedChats = chats.map(chat => {
      // Find the other member who is not the current logged-in user
      const otherMemberProfile = chat.members.find(
        member => member.user && member.user._id.toString() !== userId
      );

      // Debugging logs
      console.log("User ID:", userId);
      console.log("Chat Members:", chat.members);
      console.log("Other Member Profile:", otherMemberProfile);

      // Ensure otherMemberProfile exists before accessing its properties
      if (!otherMemberProfile) {
        console.error("Other member profile not found for chat:", chat._id);
        return null;
      }

      return {
        _id: chat._id,
        otherMember: {
          _id: otherMemberProfile._id,
          name: `${otherMemberProfile.user.first_name || ''} ${otherMemberProfile.user.last_name || ''}`.trim(),
          profilePicture: otherMemberProfile.profilePicture,
          bio: otherMemberProfile.bio
        },
        lastMessage: chat.lastMessage,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      };
    }).filter(chat => chat !== null); // Remove any null entries

    res.status(200).json({
      status: "success",
      chats: formattedChats,
    });
  } catch (err) {
    console.error("Error getting user chats:", err);
    next(new createError("Internal server error", 500));
  }
};

// Get a single chat (provided chat_id)
exports.getChat = async (req, res, next) => {
  try {
    const chatId = req.params.chat_id;
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
