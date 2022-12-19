import { Storage } from '@google-cloud/storage'

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("images-from-nodejs-server");

const getListImages = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    console.log(files)
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
export {getListImages}