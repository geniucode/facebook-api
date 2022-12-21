import express from "express";
import { query } from "express-validator";
import { STATUS_CODE } from "#root/code-status.js";
import { withAuth } from "../../../utils/withAuth.js";
import { FacebookPost } from "../../../model/facebookPost/index.js";

const getAllFacebookPostRouter = express.Router();

getAllFacebookPostRouter.get(
  "/facebook-post/get-all-posts",
  async (req, res) => {
    try {
      const postsFound = await FacebookPost.find({}).populate("user");
      if (postsFound) {
        res.status(STATUS_CODE.OK).send({ success: true, posts: postsFound });
      } else {
        res
          .status(STATUS_CODE.NotFound)
          .send({ success: false, message: "no any post" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);



export { getAllFacebookPostRouter };
