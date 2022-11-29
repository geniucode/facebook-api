import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { CommentInteraction } from "../../../model/commentInteraction/index.js";

const updateCommentInteractionRouter  = express.Router();
updateCommentInteractionRouter .put(
  "/comment/update-interaction",
  body("interactionId").notEmpty().withMessage("interaction id is required"),
  body("reaction")
  .notEmpty()
  .withMessage("reaction is required")
  .isString()
  .withMessage("Please enter a valid reaction"),
  validate,
  async (req, res) => {
    try {
      const { reaction,interactionId } = req.body;
      const updateRes=await CommentInteraction.updateOne({ _id: interactionId },{reaction});
      const arr=["Like", "Love", "Care", "Haha", "Wow", "Sad", "Angry"];
      if(arr.includes(reaction)  && updateRes.modifiedCount==1)
      res.send({ success: true, message: "update interaction comment done" });
      else{
        res.send({ success: false, message: "update interaction comment not done" });
      }

    
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { updateCommentInteractionRouter  };
