import express from "express";
import { userLoginRouter } from "./login/index.js";
import { userSignupRouter } from "./signup/index.js";
import { userForgotPasswordRouter } from "./forgotPassword/index.js";
import { userResetPasswordRouter } from "./resetPassword/index.js";
import { userSearchRouter } from "./search/index.js";
import { validateTokenRouter } from "./validateToken/index.js";
import { getUserByIdRouter } from "./getUserById/index.js";
import { userUpdateCoverPhotoRouter } from "./updateCoverPhoto/index.js";
import { activateAccountRouter } from "./activateAccount/index.js";

const userRouter = express.Router();
userRouter.use(userLoginRouter);
userRouter.use(userSignupRouter);
userRouter.use(userForgotPasswordRouter);
userRouter.use(userResetPasswordRouter);
userRouter.use(userSearchRouter);
userRouter.use(validateTokenRouter);
userRouter.use(getUserByIdRouter);
userRouter.use(userUpdateCoverPhotoRouter);
userRouter.use(activateAccountRouter);

export { userRouter };
