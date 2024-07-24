// backend/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default:null
    },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
