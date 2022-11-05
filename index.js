import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userResetPasswordRouter } from "#route/user/resetPassword/index.js";
import { connectToDB } from "#root/dbconnection.js";
import { userRouter } from "#route/user/index.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(userForgotPasswordRouter);
app.use(userResetPasswordRouter);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    const port = process.env.port;
    app.listen(port, () => {
      console.log(`listening on ${port}' ...`);
    });
  })
  .catch((err) => console.log(err));
