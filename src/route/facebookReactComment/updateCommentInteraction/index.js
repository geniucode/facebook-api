import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookReactComment } from "../../../model/FacebookReactComment/index.js";
import { withAuth } from "../../../utils/withAuth.js";


const updateCommentReactRouter  = express.Router();
updateCommentReactRouter .put(
  "/comment/update-react",
  withAuth,
  body("commentId").notEmpty().withMessage("comment id is required"),
  body("react")
  .notEmpty()
  .withMessage("react is required")
  .isString()
  .withMessage("Please enter a valid react"),
  validate,
  async (req, res) => {
    try {
      const userId=req.user._id;
      const {react,commentId } = req.body;
     const isApdate=await FacebookReactComment.updateOne({ commentId,userId },{react},{ runValidators: true });
      if(isApdate.modifiedCount>0)
     res.send({ success: true, message: "update react comment done" });
     else
     res.send({ success: false, message: "update react comment not done" });
      
    
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { updateCommentReactRouter };
