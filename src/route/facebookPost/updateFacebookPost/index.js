import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookPost } from "#model/facebookPost/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const updateFacebookPostRouter = express.Router();

updateFacebookPostRouter.put(
  "/facebook-post/update-post-by-id",
  body("_id").notEmpty().withMessage("Post ID is required to update"),
  validate,
  async (req, res) => {
    try {
      const { _id, postBody, postImg } = req.body;
      const post = await FacebookPost.findByIdAndUpdate(
        { _id },
        { postBody, postImg }
      );
      if (post) {
        res
          .status(STATUS_CODE.OK)
          .send({ success: true, message: "Post updated successfully" });
      } else {
        res
          .status(STATUS_CODE.NotFound)
          .send({ success: false, message: "Post not found" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

export { updateFacebookPostRouter };
