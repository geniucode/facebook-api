import express from "express";
import cors from "cors";
import { userRouter } from "./src/route/user/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(3001, () => {
  console.log("listening on port 3001...");
});
