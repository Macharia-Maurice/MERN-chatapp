// controllers/messageController.js
const Message = require("../models/messageModel");
const Chat = require("../models/ChatModel");
const createError = require("../utils/appError");

// // Send a message
// exports.sendMessage = async (req, res, next) => {
//   try {
//     const { chatId, type, content, replyTo } = req.body;
//     const sender = req.user.id;

//     const message = new Message({ chatId, sender, type, content, replyTo });
//     await message.save();

//     // Update last message in chat
//     const chat = await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id }, { new: true });

//     res.status(201).json({
//       status: "success",
//       message,
//       chat,
//     });
//   } catch (err) {
//     console.error("Error sending message:", err);
//     next(new createError("Internal server error", 500));
//   }
// };

// // Get all messages for a specific chat
// exports.getAllMessages = async (req, res, next) => {
//     const { chatId } = req.params;
  
//     try {
//       // Verify the chat exists
//       const chat = await Chat.findById(chatId)
//         .populate("members", "user")
//         .populate("lastMessage");
  
//       if (!chat) {
//         return next(new createError("Chat not found", 404));
//       }
  
//       // Find all messages for the chat
//       const messages = await Message.find({ chatId })
//         .populate("sender", "user") // Populate sender details
//         .populate("replyTo", "content sender") // Populate replyTo details if needed
//         .sort({ createdAt: 1 }); // Sort messages by creation date, oldest first
  
//       res.status(200).json({
//         status: "success",
//         data: {
//           chat,
//           messages,
//         },
//       });
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//       next(new createError("Internal server error", 500));
//     }
//   };




// // Mark message as seen
// exports.markAsSeen = async (req, res, next) => {
//   try {
//     const { messageId } = req.params;

//     const message = await Message.findByIdAndUpdate(messageId, { seen: true }, { new: true });

//     if (!message) {
//       return next(new createError("Message not found", 404));
//     }

//     res.status(200).json({
//       status: "success",
//       message,
//     });
//   } catch (err) {
//     console.error("Error marking message as seen:", err);
//     next(new createError("Internal server error", 500));
//   }
// };
