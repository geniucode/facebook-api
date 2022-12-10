import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { User } from "../../../model/user/index.js";
import { FacebookComment } from "../../../model/facebookComment/index.js";

const addFacebookCommentRouter = express.Router();

addFacebookCommentRouter.post(
  "/add-comment",
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("Please enter a valid comment"),
    body("commentImage")
    .notEmpty()
    .withMessage("Image is required")
    .isString()
    .withMessage("Please enter a valid image for comment "), 
  body("userId").notEmpty().withMessage("userId required"),
  body("postId").notEmpty().withMessage("postId is required"),

  validate,
  async (req, res) => {
    try {
      const { comment,commentImage, userId, postId } = req.body;
      const newcomment = new facebookcomment({ comment,commentImage, userId, postId });
      const findcomment = await facebookcomment
        .findOne({ postId })
        .lean();
      if (findcomment) {
        await facebookComment.deleteOne({ commentId });
      }
      await newcomment.save();
      res.send({ success: true, message: "comment is be saved" });
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({
        success: false,
        message: "catch error ,wrong entered data for comment field",
        error,
      });
    }
  }
);

export { addFacebookCommentRouter };
