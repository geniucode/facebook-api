import express from "express";
import { upload } from "../../img-cloud-methods/upload-img.js";
const uploadImgRouter = express.Router();

uploadImgRouter.post("/upload", upload)
export {uploadImgRouter}