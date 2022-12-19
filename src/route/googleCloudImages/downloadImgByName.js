import express from "express";
import { download } from "../../img-cloud-methods/download-img.js";

const downloadImgByNameRouter = express.Router();

downloadImgByNameRouter.get("/images/download", download);
export { downloadImgByNameRouter };
