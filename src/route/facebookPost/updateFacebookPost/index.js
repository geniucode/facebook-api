import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookPost } from "#model/facebookPost/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const updateFacebookPostRouter = express.Router();

updateFacebookPostRouter.post(
  "/facebook-post/update-post-by-id",
  body("_id")
    .notEmpty()
    .withMessage("Post ID is required to update"),
  body("postBody").isString(),
  body("postImg").isString(),
  validate,
  async (req, res) => {
    try {
      const { _id, bostBody, postImg } = req.body;
      const postFound = await FacebookPost.findOne({ _id });
      if (postFound) {
        FacebookPost.updateOne(
          { _id: _id },
          { bostBody: bostBody, postImg: postImg }
        );
      } else{
        res
        .status(STATUS_CODE.NotFound)
        .send({ success: false, error, message: "Post not found" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, error, message: "wrong input" });
    }
  }
);

export { updateFacebookPostRouter };
