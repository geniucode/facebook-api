import express from "express";
import { userLoginRouter } from "./login/index.js";
import { userSignupRouter } from "./signup/index.js";
import { userForgotPasswordRouter } from "./forgotPassword/index.js";
import { userResetPasswordRouter } from "./resetPassword/index.js";
import { validateTokenRouter } from "./validateToken/index.js";
import { addCommentInteractionRouter } from "../commentInteraction/addCommentInteraction/index.js";

const userRouter = express.Router();
userRouter.use(userLoginRouter);
userRouter.use(userSignupRouter);
userRouter.use(userForgotPasswordRouter);
userRouter.use(userResetPasswordRouter);
userRouter.use(validateTokenRouter);
userRouter.use(addCommentInteractionRouter)

export { userRouter };
