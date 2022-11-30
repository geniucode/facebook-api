import mongoose, { Schema } from "mongoose";

const facebookPostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  postDate: Date,
  postBody: Schema.Types.Mixed,
  comments: [{ type: Schema.Types.ObjectId, ref: 'FacebookComment'}],
  reacts: [{ type: Schema.Types.ObjectId, ref: 'FacebookReactPost'}],
});

export const FacebookPost = mongoose.model("FacebookPost", facebookPostSchema);
