import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookReactComment } from "../../../model/FacebookReactComment/index.js";


const addCommentReactRouter = express.Router();

addCommentReactRouter.post(
  "/comment/add-react",
  body("react")
    .notEmpty()
    .withMessage("react is required")
    .isString()
    .withMessage("Please enter a valid react"),
  body("userId").notEmpty().withMessage("userId required"),
  body("commentId").notEmpty().withMessage("commentId is required"),

  validate,
  async (req, res) => {
    try {
      const { react, userId, commentId } = req.body;
      const newReact = new FacebookReactComment({ react, userId, commentId });
      const findReact = await FacebookReactComment
        .findOne({ userId, commentId })
        .lean();
      if (findReact) {
        await FacebookReactComment.deleteOne({ userId, commentId });
      }
      await newReact.save();
      res.send({ success: true, message: "react with comment is done" });
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({
        success: false,
        message: "catch error ,wrong entered data",
        error,
      });
    }
  }
);

export { addCommentReactRouter };
