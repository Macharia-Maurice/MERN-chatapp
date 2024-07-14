const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profilePicture: { type: String }, // url to path of image
  },
  {
    timestamps: true,
  }
);

const userProfileModel = model("UserProfile", userProfileSchema);

module.exports = userProfileModel;
