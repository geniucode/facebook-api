import express from "express";
import { downloadImgByNameRouter } from "./downloadImgByName.js";
import { getListImagesRouter } from "./getListImage.js";
import { uploadImgRouter } from "./uploadImg.js";

const processImgWithGoogleCloudRouter = express.Router();
processImgWithGoogleCloudRouter.use(getListImagesRouter);
processImgWithGoogleCloudRouter.use(uploadImgRouter);
processImgWithGoogleCloudRouter.use(downloadImgByNameRouter)




export {processImgWithGoogleCloudRouter};
