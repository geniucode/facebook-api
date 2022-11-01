import express from "express";
import cors from "cors";
import { connectToDB } from "#root/dbconnection.js";
import { userRouter } from "#route/user/index.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(3001, () => {
      console.log("listening on port 3001...");
    });
  })
  .catch((err) => console.log(err));
