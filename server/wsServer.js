// wsServer.js
const WebSocket = require('ws');
const Message = require('./models/messageModel');
const User = require('./models/userModel');
const Chat = require('./models/ChatModel');

const wsServer = new WebSocket.Server({ noServer: true });

// Store connected clients
const clients = new Map();

wsServer.on('connection', (socket, req) => {
  const userId = req.user.id;

  // Store the socket for this user
  clients.set(userId, socket);

  socket.on('message', async (messageData) => {
    try {
      const { chatId, content, type, replyTo } = JSON.parse(messageData);

      // Create and save the new message
      const newMessage = await Message.create({
        chatId,
        sender: userId,
        type,
        content,
        replyTo,
      });

      // Update the last message in the chat
      await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

      // Broadcast the message to all users in the chat
      const chat = await Chat.findById(chatId).populate('members', 'user');
      chat.members.forEach((member) => {
        const memberId = member.user.toString();
        if (clients.has(memberId)) {
          clients.get(memberId).send(JSON.stringify(newMessage));
        }
      });
    } catch (err) {
      console.error('Error handling message:', err);
    }
  });

  socket.on('close', () => {
    clients.delete(userId);
  });
});

module.exports = wsServer;
