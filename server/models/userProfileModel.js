const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// Define the UserProfile schema
const userProfileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		profilePicture: {
			type: String,
			default: "", // Adding a default value can be helpful
		},
		bio: {
			type: String,
			default: "",
		},
		lastActive: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

// Create the UserProfile model
const UserProfile = model("UserProfile", userProfileSchema);

// Export the UserProfile model
module.exports = UserProfile;
