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

// Middleware to create a UserProfile after a User is created
UserSchema.post("save", async function (doc, next) {
  try {
    const UserProfile = model("UserProfile");
    await UserProfile.create({ user: doc._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the User model
const User = model("User", UserSchema);

module.exports = User;
