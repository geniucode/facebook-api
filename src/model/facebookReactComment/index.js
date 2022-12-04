import mongoose from "mongoose";
import { reactEnum } from "../../enum/react";
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
  },
});

export const facebookReactComment = mongoose.model(
  "facebookReactComment",
  facebookReactCommentSchema
);
