import express, { query } from "express";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactPost } from "../../../model/facebookReactPost/index.js";

const getReactPostRouter = express.Router();
getReactPostRouter.get("/post/get-react", async (req, res) => {
  try {
    const { postId } = req.query;
    const react = await facebookReactPost.find({ postId }).lean();
    if (react.length > 0) {
      res.send({
        success: true,
        react: react,
      });
    } else {
      res.send({
        success: false,
      });
    }
  } catch (error) {
    res
      .status(STATUS_CODE.BadInput)
      .send({ success: false, message: "catch error ,wrong entered data" });
  }
});
export { getReactPostRouter };
