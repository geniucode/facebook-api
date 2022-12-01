import express from "express";
import { addCommentReactRouter } from "./addCommentReact/index.js";
import { deleteCommentReactRouter } from "./deleteCommentInteraction/index.js";
import { getCommentReactRouter } from "./getCommentInteraction/index.js";
import { updateCommentReactRouter } from "./updateCommentInteraction/index.js";


const commentReactRouter = express.Router();
commentReactRouter.use(addCommentReactRouter);
commentReactRouter.use(deleteCommentReactRouter);
commentReactRouter.use(getCommentReactRouter)
commentReactRouter.use(updateCommentReactRouter)



export {commentReactRouter };
