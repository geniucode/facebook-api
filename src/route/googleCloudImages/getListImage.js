import express from "express";
import { getListImages } from "../../img-cloud-methods/get-list-images.js";
const getListImagesRouter = express.Router();

getListImagesRouter.get("/images", getListImages)
export {getListImagesRouter}
