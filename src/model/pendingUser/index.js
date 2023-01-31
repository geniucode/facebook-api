import mongoose, { Schema } from "mongoose";

const pendingUsersSchema = new Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  gender: String,
  password: String,
  birthDay: Date,
  country: String,
});

pendingUsersSchema.index({ email: 1 });
export const PendingUser = mongoose.model("PendingUser", pendingUsersSchema);