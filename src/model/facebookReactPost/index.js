import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const facebookReactPostSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
  postId: {
    type: ObjectId,
    ref: "facebookPost",
  },
  // reaction: {
  //   type: {ReactionEnum}
  // }
});

export const FacebookReactPost = mongoose.model(
  "facebookReactPost",
  facebookReactPostSchema
);
