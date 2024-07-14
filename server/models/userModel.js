const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// Define the User schema
const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the User model
module.exports = model("User", UserSchema);
