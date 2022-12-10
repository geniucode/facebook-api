import express, { application } from "express";
import { addPostReactRouter } from "./addPostReact/index.js";
import { deleteReactPost } from "./deleteReactPost/index.js";
import { getReactPostRouter } from "./getReactPost/index.js";
import { updatePostReactRouter } from "./updatePostReact/index.js";

const postReactRouter = express.Router();
postReactRouter.use(addPostReactRouter);
postReactRouter.use(updatePostReactRouter);
postReactRouter.use(deleteReactPost);
postReactRouter.use(getReactPostRouter);

export { postReactRouter };
