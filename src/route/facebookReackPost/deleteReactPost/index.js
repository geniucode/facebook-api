import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactPost } from "../../../model/facebookReactPost/index.js";

const deleteReactPost = express.Router();
deleteReactPost.delete(
  "/post/delete-react",
  body("userId").notEmpty().withMessage("userId required"),
  body("postId").notEmpty().withMessage("comment id is required"),

  validate,
  async (req, res) => {
    try {
      const { userId, postId } = req.body;
      const findreact = await facebookReactPost
        .findOne({ userId, postId })
        .lean();
      if (findreact) {
        await facebookReactPost.deleteOne({ postId });
        res.send({ success: true, message: "delete react done" });
      } else {
        res.send({ success: false, message: "delete react not done" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { deleteReactPost };
