import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  gender: String,
  password: String,
  birthDay: Date,
  country: String,
  pending: { type: Boolean , default: true },
  forgetPasswordToken: { type: String , default: "" },
  coverPhoto: { type: String , default: "" },
  profilePic: { type: String , default: "" },
});
usersSchema.index({ email: 1 });
export const User = mongoose.model("User", usersSchema);
