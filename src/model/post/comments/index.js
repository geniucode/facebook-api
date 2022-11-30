import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
  },

  post: {
    type: ObjectId,
    ref: "Posts",
    required: true,
  },
  image: {
    type: String,
  },
  commentBy: {
    type: ObjectId,
    ref: "User",
  },
  commentAt: {
    type: Date,
    default: new Date(),
  },
  timestamps: true,
});

export const comments = mongoose.model("comments", commentSchema);
