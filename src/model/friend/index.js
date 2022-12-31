import mongoose, { Schema } from "mongoose";
const facebookFriendSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enums: [
        "pending", //'pending',
        "accepted", //'friends'=>accepted
      ],
      default: "pending",
    },
    notification: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const FacebookFriend = mongoose.model(
  "FacebookFriend",
  facebookFriendSchema
);
