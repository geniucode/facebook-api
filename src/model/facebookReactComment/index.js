import mongoose from "mongoose";
const facebookReactCommentSchema = new mongoose.Schema({
  react: {
    type: String,
    required: true,
    enum: reactEnum,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "facebookComment",
    required: true,
    unique: true,
  },
});

export const facebookReactComment = mongoose.model(
  "facebookReactComment",
  facebookReactCommentSchema
);
