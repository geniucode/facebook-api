import express from "express";
import { Storage } from "@google-cloud/storage";

const getAllImages = express.Router();

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("rabee-facebook-bucket");

const getImages = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    console.log(files);
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });

    res.status(200).send(fileInfos);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Unable to read list of files!",
    });
  }
};

getAllImages.get("/images", getImages);

export { getAllImages };
