import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { facebookReactComment } from "../../../model/facebookReactComment/index.js";


const updateCommentReactRouter  = express.Router();
updateCommentReactRouter .put(
  "/comment/update-react",
  body("commentId").notEmpty().withMessage("comment id is required"),
  body("react")
  .notEmpty()
  .withMessage("react is required")
  .isString()
  .withMessage("Please enter a valid react"),
  validate,
  async (req, res) => {
    try {
      const {react,commentId  } = req.body;
      const findreact = await facebookReactComment.findOne({ commentId }).lean()
      if(findreact){
     await facebookReactComment.updateOne({commentId},{react},{ runValidators: true });
      res.send({ success: true, message: "update react comment done" });
      }
      else{
        res.send({ success: false, message: "update react comment not done" });
      }
    
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { updateCommentReactRouter };
