import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "#root/db-connection.js";
import { userRouter } from "#route/user/index.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(userRouter);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    const port = process.env.port;
    app.listen(port, () => {
      console.log(`listening on ${port}' ...`);
    });
  })
  .catch((err) => console.log(err));
