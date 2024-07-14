const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// Define the Message schema
const messageSchema = new Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Define the Conversation schema
const conversationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create models from the schemas
const Message = model("Message", messageSchema);
const Conversation = model("Conversation", conversationSchema);

// Export the models
module.exports = { Conversation, Message };
