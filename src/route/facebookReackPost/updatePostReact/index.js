import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactPost } from "../../../model/facebookReactPost/index.js";

const updatePostReactRouter = express.Router();
updatePostReactRouter.put(
  "/post/update-react",
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

      await facebookReactPost.updateOne(
        { userId, postId },
        { react },
        { runValidators: true }
      );
      res.send({ success: true, message: "update react post done" });
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send(
          { success: false, message: "catch error ,wrong entered data" },
          error
        );
    }
  }
);

export { updatePostReactRouter };
