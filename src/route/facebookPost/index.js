import express from "express";
import { addFacebookPostRouter } from "./addFacebookPost/index.js";
import { getFacebookPostRouter } from "./getFacebookPost/index.js";
import { deleteFacebookPostRouter } from "./deleteFacebookPost/index.js";
import { updateFacebookPostRouter } from "./updateFacebookPost/index.js";
import {  getAllPostsRouter } from "./getAllFacebookPosts/index.js";

const facebookPostRouter = express.Router();
facebookPostRouter.use(addFacebookPostRouter);
facebookPostRouter.use(getFacebookPostRouter);
facebookPostRouter.use(deleteFacebookPostRouter);
facebookPostRouter.use(updateFacebookPostRouter);
facebookPostRouter.use(getAllPostsRouter);

export { facebookPostRouter };