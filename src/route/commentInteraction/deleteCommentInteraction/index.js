import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { CommentInteraction } from "../../../model/commentInteraction/index.js";

const deleteCommentInteractionRouter = express.Router();
deleteCommentInteractionRouter.delete(
  "/comment/delete-interaction",
  body("interactionId").notEmpty().withMessage("interaction id is required"),

  validate,
  async (req, res) => {
    try {
      const { interactionId } = req.body;
      const updateRes=await CommentInteraction.deleteOne({ _id: interactionId });
      console.log(updateRes)
      if(updateRes.deletedCount==1)
      res.send({ success: true, message: "delete interaction comment done" });
      else{
        res.send({ success: false, message: "delete interaction comment not done" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { deleteCommentInteractionRouter };
