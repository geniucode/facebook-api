import mongoose, { Schema } from "mongoose";
const facebookFriendSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "Users" },
    recipient: { type: Schema.Types.ObjectId, ref: "Users" },
    status: {
      type: Number,
      enums: [
        0, //'add friend',
        1, //'requested',
        2, //'pending',
        3, //'friends'
      ],
    },
    notification: { Boolean, default: false },
  },
  { timestamps: true }
);

export const FacebookFriend = mongoose.model(
  "FacebookFriend",
  facebookFriendSchema
);
