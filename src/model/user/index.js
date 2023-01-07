import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  gender: String,
  password: String,
  birthDay: Date,
  country: String,
  forgetPasswordToken: String,
  profilePic: String,
});
usersSchema.index({ email: 1 });
export const User = mongoose.model("User", usersSchema);
