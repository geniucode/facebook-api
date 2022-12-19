import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "#root/db-connection.js";
import { userRouter } from "#route/user/index.js";
import { facebookPostRouter } from "#route/facebookPost/index.js";
import { facebookCommentRouter } from "./src/route/facebookComment/index.js";

import { commentReactRouter } from "./src/route/facebookReactComment/index.js";
import { postReactRouter } from "./src/route/facebookReackPost/index.js";
import { upload } from "./src/img-cloud-methods/upload-img.js";
import { getListImages } from "./src/img-cloud-methods/get-list-images.js";
import { download } from "./src/img-cloud-methods/download-img.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(commentReactRouter);
app.use(facebookPostRouter);
app.use(facebookCommentRouter);
app.use(postReactRouter);
app.post("/upload", upload);
app.get("/images", getListImages);
app.get("/imge/download", download);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    const port = process.env.port;
    app.listen(port, () => {
      console.log(`listening on ${port}' ...`);
    });
  })
  .catch((err) => console.log(err));
