import express from "express";
import { query } from "express-validator";
import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { FacebookPost } from "#model/facebookPost/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const getFacebookPostRouter = express.Router();

getFacebookPostRouter.get(
  "/facebook-post/get-post-by-id",
  query("_id").notEmpty().withMessage("Post ID is required to search"),
  validate,
  async (req, res) => {
    try {
      const { _id } = req.query;
      const postFound = await FacebookPost.findOne({ _id, });
      if (postFound) {
        res.send({ success: true, post: postFound });
      } else {
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

getFacebookPostRouter.get(
  "/facebook-post/get-post-by-user",
  query("user").notEmpty().withMessage("User is required to search"),
  validate,
  async (req, res) => {
    try {
      const { user } = req.query;
      const userFound = await User.findOne({ _id: user });
      if (userFound) {
        const postFound = await FacebookPost.findOne({user,});
        if (postFound) {
          res.send({ success: true, post: postFound });
        } else {
          res.status(STATUS_CODE.NotFound).send({
            success: false,
            error,
            message: "No posts from this user were found",
          });
        }
      } else {
        res.status(STATUS_CODE.NotFound).send({
            success: false,
            error,
            message: "User not found",
          });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, error, message: "wrong input" });
    }
  }
);

export { getFacebookPostRouter };
