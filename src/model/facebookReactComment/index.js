import mongoose from "mongoose";
import { reactEnum } from "../../enum/react.js";
const facebookReactCommentSchema = new mongoose.Schema({
  react: {
    type: String,
    required: true,
    enum: reactEnum,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FacebookComment",
    required: true,
  },
});

export const FacebookReactComment = mongoose.model(
  "FacebookReactComment",
  facebookReactCommentSchema
);
