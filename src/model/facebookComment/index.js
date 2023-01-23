import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const facebookCommentSchema = new Schema({
  comment: { type: String },
  postId: { type: ObjectId, ref: "facebookPost", required: true },
  commentImage: { type: String, required: false },
  commentBy: { type: ObjectId, ref: "User" },

  // timestamps: true,
});

export const FacebookComment = mongoose.model(
  "facebookComment",
  facebookCommentSchema
);
//
