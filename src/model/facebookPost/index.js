import mongoose, { Schema } from "mongoose";

const facebookPostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  postDate: Date,
  postBody: Schema.Types.Mixed,
  comments: [{ type: Schema.Types.ObjectId, ref: 'facebookComment'}],
  reacts: [{ type: Schema.Types.ObjectId, ref: 'facebookReactPost'}],
});

export const FacebookPost = mongoose.model("facebookPost", facebookPostSchema);
