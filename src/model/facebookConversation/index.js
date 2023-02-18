import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "facebookConversation",
  facebookConversationSchema
);


