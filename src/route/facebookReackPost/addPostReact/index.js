import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactPost } from "../../../model/facebookReactPost/index.js";

const addPostReactRouter = express.Router();
addPostReactRouter.post(
  "/post/add-react",
  body("userId").notEmpty().withMessage("userId required"),
  body("postId").notEmpty().withMessage("postId is required"),
  body("react")
    .notEmpty()
    .withMessage("react is required")
    .isString()
    .withMessage("Please enter a valid react"),

  validate,
  async (req, res) => {
    try {
      const { userId, postId, react } = req.body;
      const newReact = new facebookReactPost({ userId, postId, react });
      const findReact = await facebookReactPost
        .findOne({
          userId,
          postId,
        })
        .lean();
      if (findReact) {
        await facebookReactPost.deleteOne({ userId, postId });
      }
      await newReact.save();
      res.send({ success: true, message: "new react for post is done" });
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({
        success: false,
        message: "catch error, wrong entered data",
        error,
      });
    }
  }
);

export { addPostReactRouter };
