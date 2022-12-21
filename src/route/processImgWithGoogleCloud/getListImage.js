import express from "express";
import { getListImages } from "../../img-cloud-methods/get-list-images.js";
import { withAuth } from "../../utils/withAuth.js";
const getListImagesRouter = express.Router();
getListImagesRouter.get("/images",withAuth, getListImages)
export {getListImagesRouter}
