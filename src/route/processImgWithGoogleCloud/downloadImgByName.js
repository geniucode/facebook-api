import express from "express";
import { download } from "../../img-cloud-methods/download-img.js";
import { withAuth } from "../../utils/withAuth.js";

const downloadImgByNameRouter = express.Router();

downloadImgByNameRouter.get("/imge/download",withAuth,download)
export {downloadImgByNameRouter }
