import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookComment } from "../../../model/facebookComment/index.js";

const deleteFacebookCommentRouter = express.Router();
deleteFacebookCommentRouter.delete(
  "/delete-comment",
  body("postId").notEmpty().withMessage("postId id is required"),

  validate,
  async (req, res) => {
    try {
      const { postId } = req.body;
      const findComment = await FacebookComment.findOne({ postId }).lean();
      if (findComment) {
        await FacebookComment.deleteOne({ postId });
        res.send({ success: true, message: "deleting comment was successful" });
      } else {
        res.send({ success: false, message: " deleting comment has failed " });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({
          success: false,
          message:
            "catch error ,wrong entered data reply from delete comment route",
        });
    }
  }
);

export { deleteCommentReactRouter };
