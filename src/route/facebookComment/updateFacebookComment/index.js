import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookComment } from "../../../model/facebookComment/index.js";

const updateFacebookCommentRouter = express.Router();
updateFacebookCommentRouter.put(
  "/update-comment",
  body("postId").notEmpty().withMessage("post id is required"),
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("Please enter a valid comment"),
  validate,
  async (req, res) => {
    try {
      const { comment, postId } = req.body;
      const findcomment = await FacebookComment.findOne({ postId }).lean();
      if (findcomment) {
        await facebookComment.updateOne(
          { postId },
          { comment },
          { runValidators: true }
        );
        res.send({
          success: true,
          message: "updating comment is done sucessfully",
        });
      } else {
        res.send({ success: false, message: "updating comment has failed" });
      }
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({
        success: false,
        message:
          "catch error ,wrong entered data due to update route for comment",
      });
    }
  }
);

export { updateFacebookCommentRouter };
