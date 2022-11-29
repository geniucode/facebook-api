import express, { query } from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { CommentInteraction } from "../../../model/commentInteraction/index.js";

const getCommentInteractionRouter = express.Router();

getCommentInteractionRouter.get(
  "/comment/get-interaction",
  async (req, res) => {
    try {
      const { interactionId } = req.query;
      console.log(interactionId)
      const interaction = await CommentInteraction.findOne({ _id:interactionId }).lean();
      console.log(interaction)
      if (interaction) {
        res.send({
          success: true,
          interaction: interaction,
          message: "interaction is exist",
        });
      }
      else{
        res.send({
          success: false,
          message: "interaction isn't exist",
        });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "catch error ,wrong entered data" });
    }
  }
);

export { getCommentInteractionRouter };
