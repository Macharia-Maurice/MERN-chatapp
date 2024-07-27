//models/Message.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// Define the Message schema
const messageSchema = new Schema(
	{
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserProfile",
			required: true,
		},
		seenBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "UserProfile",
			},
		],
		text:{
			type: String,
			default: "",
		},
		replyTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
			default: null,
		},
	},
	{ timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create model from the schema
const Message = model("Message", messageSchema);

// Export the model
module.exports = Message;
