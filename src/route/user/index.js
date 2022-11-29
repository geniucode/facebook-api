import express from "express";
import { userLoginRouter } from "./login/index.js";
import { userSignupRouter } from "./signup/index.js";
import { userForgotPasswordRouter } from "./forgotPassword/index.js";
import { userResetPasswordRouter } from "./resetPassword/index.js";
import { validateTokenRouter } from "./validateToken/index.js";
import { addCommentInteractionRouter } from "../commentInteraction/addCommentInteraction/index.js";
import { deleteCommentInteractionRouter } from "../commentInteraction/deleteCommentInteraction/index.js";
import { updateCommentInteractionRouter } from "../commentInteraction/updateCommentInteraction/index.js";
import { getCommentInteractionRouter } from "../commentInteraction/getCommentInteraction/index.js";

const userRouter = express.Router();
userRouter.use(userLoginRouter);
userRouter.use(userSignupRouter);
userRouter.use(userForgotPasswordRouter);
userRouter.use(userResetPasswordRouter);
userRouter.use(validateTokenRouter);
userRouter.use(addCommentInteractionRouter)
userRouter.use(deleteCommentInteractionRouter)
userRouter.use(updateCommentInteractionRouter)
userRouter.use(getCommentInteractionRouter)

export { userRouter };
