// Find User Page
import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { CommentInteraction } from "../../../model/commentInteraction/index.js";


const addCommentInteractionRouter = express.Router();

addCommentInteractionRouter .post(
  "/comment/add-interaction",
  body("reaction")
    .notEmpty()
    .withMessage("reaction is required")
    .isString()
    .withMessage("Please enter a valid reaction"),
  body("userId")
    .notEmpty()
    .withMessage("reaction is required"),
  
  validate,
  async (req, res) => {
    try {
      const { reaction,userId } = req.body;
       await CommentInteraction.create({reaction,userId});
      res.send({success: true,message: "react with comment is done"})}

catch (error) {
      res.status(STATUS_CODE.BadInput).send({ success: false,message: "catch error ,wrong entered data" });
    }
  }
);

export { addCommentInteractionRouter  };
