// websocket/authenticatedWsServer.js
const WebSocket = require('ws');
const jwt = require('jsonwebtoken'); // For JWT verification
const User = require('../models/userModel');
const createError = require('../utils/appError');
const wsServer = require('../config/wsServer');

wsServer.authenticateConnection = async (request) => {
  try {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('Invalid user');

    return user;
  } catch (err) {
    console.error('Authentication error:', err);
    throw new createError('Unauthorized', 401);
  }
};

module.exports = wsServer;
