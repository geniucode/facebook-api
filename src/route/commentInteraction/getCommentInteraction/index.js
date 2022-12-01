import express, { query } from "express";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactComment } from "../../../model/facebookReactComment/index.js";

const getCommentReactRouter = express.Router();
getCommentReactRouter.get("/comment/get-react", async (req, res) => {
  try {
    const { commentId } = req.query;
    const react = await facebookReactComment.findOne({ commentId }).lean();
    if (react) {
      res.send({
        success: true,
        react:react,
        message: "react is exist",
      });
    } else {
      res.send({
        success: false,
        message: "react isn't exist",
      });
    }
  } catch (error) {
    res
      .status(STATUS_CODE.BadInput)
      .send({ success: false, message: "catch error ,wrong entered data" });
  }
});
export { getCommentReactRouter };
