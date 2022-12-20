import express from "express";
import { format } from "util";
import { Storage } from "@google-cloud/storage";
import { processFileMiddleware } from "../../utils/middlewareMulter.js";

const uploadImageRouter = express.Router();

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("rabee-facebook-bucket");

const upload = async (req, res) => {
  try {
    await processFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    console.log(req.file);
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(req.file.originalname).makePublic();
      } catch (e) {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
          e: e,
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
uploadImageRouter.post("/upload", upload);

export { uploadImageRouter };
