import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectToDB = async () => {
  await mongoose.connect(
     process.env.dbLink
  );
};
