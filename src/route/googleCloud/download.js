import express from "express";
import { Storage } from "@google-cloud/storage";

const downloadByName = express.Router();

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("rabee-facebook-bucket");
const download = async (req, res) => {
  try {
    console.log(req.query.name);
    const [metaData] = await bucket.file(req.query.name).getMetadata();

    res.redirect(metaData.mediaLink);
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
};

downloadByName.get("/images/download", download);
export { downloadByName };
