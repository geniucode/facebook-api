import express from "express";
import { connectToDB } from "./db-connection.js";
import cors from "cors";

import { userRouter } from "./src/route/user/index.js";
import { userSignupRouter } from "./src/route/signup/index.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(userSignupRouter);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(3001, () => {
      console.log("listening on port 3001...");
    });
  })
  .catch((err) => console.log(err));
