import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactComment } from "../../../model/facebookReactComment/index.js";



const deleteCommentReactRouter = express.Router();
deleteCommentReactRouter.delete(
  "/comment/delete-react",
  body("commentId").notEmpty().withMessage("comment id is required"),

  validate,
  async (req, res) => {
    try {
      const { commentId } = req.body;
      const findreact = await facebookReactComment.findOne({ commentId }).lean()
      if(findreact){
        await facebookReactComment.deleteOne({ commentId });
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
