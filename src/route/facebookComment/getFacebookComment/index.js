import express, { query } from "express";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookComment } from "../../../model/facebookComment/index.js";

const getFacebookCommentRouter = express.Router();
getFacebookCommentRouter.get("/get-comment", async (req, res) => {
  try {
    const { postId } = req.query;
    const comment = await FacebookComment.find({ postId }).lean();
    if (comment) {
      res.send({
        success: true,
        comment:comment,
        message: "comment exist",
      });
    } else {
      res.send({
        success: false,
        message: "comment doesn't exist",
      });
    }
  } catch (error) {
    res
      .status(STATUS_CODE.BadInput)
      .send({ success: false, message: "catch error ,wrong entered dat get comment reply" });
  }
});
export { getFacebookCommentRouter };
