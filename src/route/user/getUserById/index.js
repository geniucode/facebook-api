import express from "express";
import { query } from "express-validator";
import { STATUS_CODE } from "#root/code-status.js";
import { User } from "../../../model/user/index.js";

const getUserByIdRouter = express.Router();
getUserByIdRouter.get("/user/by-id", query("id"), async (req, res) => {
  try {
    const { id } = req.query;
    const userFound = await User.findOne({ _id: id }).lean();
    if (userFound) {
      return res.status(STATUS_CODE.OK).send({
        success: true,
        userFound,
      });
    } else {
      return res.status(STATUS_CODE.BadInput).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(STATUS_CODE.BadInput)
      .send({ success: false, message: err });
  }
});

export { getUserByIdRouter };
