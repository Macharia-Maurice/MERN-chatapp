const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

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
  { timestamps: true }
);

const conversationSchema = new Schema(
  {
    sender: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        type: Schema.ObjectId,
        ref: "Message",
      },
    ],
  },

  { timestamps: true }
);


const messageModel = model("Message", messageSchema);

const conversationModel = model("Conversation", conversationSchema);

module.exports = { conversationModel, messageModel };
