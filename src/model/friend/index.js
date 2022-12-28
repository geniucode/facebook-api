import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;
const facebookFriendSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    friends: { type: Array,default:[]},
    requests:{ type: Array,default:[]},
  },
);

export const FacebookFriend = mongoose.model("FacebookFriend", facebookFriendSchema);