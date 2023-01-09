import express from "express";
import { query } from "express-validator";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookPost } from "../../../model/facebookPost/index.js";
const getAllUserPostsRouter = express.Router();
getAllUserPostsRouter.get(
  "/user/posts/by-id",
  query("id"),
  async (req, res) => {
    try {
      const { id } = req.query;
      const userPosts = await FacebookPost.find({ user: id })
        .sort({ createdAt: -1 })
        .lean();
      if (userPosts.length > 0) {
        return res.status(STATUS_CODE.OK).send({
          success: true,
          userPosts,
        });
      } else {
        return res.status(STATUS_CODE.BadInput).send({
          success: false,
          message: "User  posts not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: err });
    }
  }
);

export { getAllUserPostsRouter };
