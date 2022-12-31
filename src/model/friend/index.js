import mongoose, { Schema } from "mongoose";
export const statusConstants = {
  pending: "pending", //'pending',
  accepted: "accepted", //'friends'=>accepted
};
const facebookFriendSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enums: [
        statusConstants.pending, //'pending',
        statusConstants.accepted, //'friends'=>accepted
      ],
      default: statusConstants.pending,
    },
    notification: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const FacebookFriend = mongoose.model(
  "FacebookFriend",
  facebookFriendSchema
);
