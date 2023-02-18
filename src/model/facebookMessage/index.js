import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
