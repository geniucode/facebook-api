import express from "express";
import controller from "#src/controller/file.controller.js";

const googleCloudServiceRouter = express.Router();

googleCloudServiceRouter.post("/upload", controller.upload);
googleCloudServiceRouter.get("/files", controller.getListFiles);
googleCloudServiceRouter.get("/files/:name", controller.download);

export { googleCloudServiceRouter };
