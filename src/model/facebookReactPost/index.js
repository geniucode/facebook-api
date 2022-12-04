import mongoose from "mongoose";
import { reactEnum } from "../../enum/react.js";

const facebookReactPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  react: {
    type: String,
    required: true,
    enum: reactEnum,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "facebookPost",
    required: true,
  },
});

export const facebookReactPost = mongoose.model(
  "facebookReactPost",
  facebookReactPostSchema
);
