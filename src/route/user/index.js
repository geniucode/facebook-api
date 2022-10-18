import express from "express";
import { userLoginRouter } from "./login/index.js";
import { userSignupRouter } from "./signup/index.js";

const userRouter = express.Router();
userRouter.use(userLoginRouter);
userRouter.use(userSignupRouter);

export { userRouter };
