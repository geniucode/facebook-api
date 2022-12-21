import express from "express";
import { Storage } from "@google-cloud/storage";
import { withAuth } from "../../utils/withAuth.js";

const downloadByName = express.Router();

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("rabee-facebook-bucket");
const download = async (req, res) => {
  try {
    console.log(req.query.name);
    const [metaData] = await bucket.file(req.query.name).getMetadata();
    console.log(metaData);
    res.redirect(metaData.mediaLink);
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
};

downloadByName.get("/images/download", withAuth, download);
export { downloadByName };
