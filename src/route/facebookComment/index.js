import express from "express";
import { addFacebookCommentRouter } from "./addFacebookComment/index.js";
import { getFacebookCommentRouter } from "./getFacebookComment/index.js";
import { updateFacebookCommentRouter } from "./updateFacebookComment/index.js";


const facebookCommentRouter = express.Router();
facebookCommentRouter.use(addFacebookCommentRouter);
facebookCommentRouter.use(getFacebookCommentRouter);
facebookCommentRouter.use(updateFacebookCommentRouter);


export  {facebookCommentRouter};
