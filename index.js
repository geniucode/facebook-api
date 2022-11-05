import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDB } from "./db-connection.js";
import { userRouter } from "./src/route/user/index.js";
import { userForgotPasswordRouter } from "./src/route/user/forgotPassword/index.js";
import { userResetPasswordRouter } from "./src/route/user/resetPassword/index.js";

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
