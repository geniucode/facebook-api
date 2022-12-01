import mongoose from "mongoose";
const facebookReactCommentSchema = new mongoose.Schema({
  react: {
    type: String,
    required: true,
    enum: ["Like", "Love", "Care", "Haha", "Wow", "Sad", "Angry"],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "facebookComment",
    required: true,
    unique: true,
    type:String
  },
});

export const facebookReactComment = mongoose.model(
  "facebookReactComment",
  facebookReactCommentSchema
);
