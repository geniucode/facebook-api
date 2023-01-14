import mongoose, { Schema } from "mongoose";

const userProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    profilePic: { type: String, required: false },
  },
  { timestamps: true }
);

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
