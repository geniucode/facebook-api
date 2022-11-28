import mongoose, { Schema } from "mongoose";
import { User } from "../user/index.js";

const commentInteractionSchema = new Schema({
  reaction: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
   //must change required to true
   commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: false,
  },
});

export const CommentInteraction = mongoose.model(
  "CommentInteraction",
  commentInteractionSchema
);
