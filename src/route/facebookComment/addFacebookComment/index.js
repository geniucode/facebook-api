import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { User } from "../../../model/user/index.js";
import { FacebookComment } from "../../../model/facebookComment/index.js";
import { withAuth } from "../../../utils/withAuth.js";

const addFacebookCommentRouter = express.Router();

addFacebookCommentRouter.post(
  "/add-comment",
  withAuth,
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("Please enter a valid comment"),

  body("userId").notEmpty().withMessage("userId required"),
  body("postId").notEmpty().withMessage("postId is required"),

  validate,
  async (req, res) => {
    try {
      const member = req.user;
      const createdBy = member._id;
      const { comment, postId } = req.body;
      const newcomment = new FacebookComment({
        comment,
        postId,
        commentBy: createdBy,
      });
      await newcomment.save();
      res.send({ success: true, message: "comment saved" });
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
