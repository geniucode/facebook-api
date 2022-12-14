import mongoose, { Schema } from "mongoose";

const facebookPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    postBody: { type: String, required: false },
    postImg: { type: String, required: false },
  },
  { timestamps: true }
);

export const FacebookPost = mongoose.model("FacebookPost", facebookPostSchema);
