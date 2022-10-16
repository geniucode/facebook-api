import mongoose from "mongoose";

export const connectToDB = async () => {
  await mongoose.connect(
    'mongodb+srv://MERNDB:Ln3jiYqKq6CA43Ia@cluster0.mbg3avh.mongodb.net/test'
  );};



