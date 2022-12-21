import express from "express";
import { upload } from "../../img-cloud-methods/upload-img.js";
import { withAuth } from "../../utils/withAuth.js";
const uploadImgRouter = express.Router();

uploadImgRouter.post("/upload",withAuth, upload)
export {uploadImgRouter}