import mongoose, { Schema } from "mongoose";

const facebookPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    postBody: { type: String, required: false },
    postImg: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const FacebookPost = mongoose.model("FacebookPost", facebookPostSchema);
