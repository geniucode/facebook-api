import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookReactComment } from "../../../model/FacebookReactComment/index.js";
import { withAuth } from "../../../utils/withAuth.js";



const deleteCommentReactRouter = express.Router();
deleteCommentReactRouter.delete(
  "/comment/delete-react",
  withAuth,
  body("commentId").notEmpty().withMessage("comment id is required"),
  validate,
  async (req, res) => {
    try {
      const userId=req.user._id;
      const { commentId } = req.body;
      const findreact = await FacebookReactComment.findOne({ commentId,userId }).lean()
      if(findreact){
        await FacebookReactComment.deleteOne({ commentId,userId });
      res.send({ success: true, message: "delete react comment done" });
      }
      else{
        res.send({ success: false, message: "delete react comment not done" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { deleteCommentReactRouter };
