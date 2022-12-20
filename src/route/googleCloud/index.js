import express from "express";
import { downloadByName } from "./download.js";
import { getAllImages } from "./getAllImages.js";
import { uploadImageRouter } from "./uploadImage.js";

const googleImagesRouter = express.Router();

googleImagesRouter.use(downloadByName);
googleImagesRouter.use(getAllImages);
googleImagesRouter.use(uploadImageRouter);

export { googleImagesRouter };
