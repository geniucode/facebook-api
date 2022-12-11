import express, { query } from "express";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookReactComment } from "../../../model/FacebookReactComment/index.js";

const getCommentReactRouter = express.Router();
getCommentReactRouter.get("/comment/get-react", async (req, res) => {
  try {
    const { commentId } = req.query;
    const react = await FacebookReactComment.find({ commentId }).lean();
  
    if (react.length >0) {
      res.send({
        success: true,
        react:react,
        message: "react is exist",
      });
    } else {
      res.send({
        success: false,
        message: "react isn't exist because comment isn't exist ",
      });
    }
  } catch (error) {
    res
      .status(STATUS_CODE.BadInput)
      .send({ success: false, message: "catch error ,wrong entered data" });
  }
});
export { getCommentReactRouter };
