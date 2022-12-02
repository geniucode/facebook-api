import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const facebookReactPostSchema = new Schema({
  reactionId: {
    type: String,
  },
  reactedBy: {
    type: ObjectId,
    ref: "User",
  },
  reactedOnpost: {
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
