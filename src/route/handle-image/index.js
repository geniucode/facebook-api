import express from "express";
import { updateImageRouter } from "./image-upload.js";


const handleImageRouter = express.Router();
handleImageRouter.use(updateImageRouter);



export {handleImageRouter};
