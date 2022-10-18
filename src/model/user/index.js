import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  email: { type: String, unique: true, index: true },
  gender: String,
  password: String,
  age: Number,
  country: String,
});
usersSchema.index({ email: 1 });
export const User = mongoose.model("User", usersSchema);
