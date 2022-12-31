import express from "express";
import { query } from "express-validator";
import { validate } from "#utils/validator.js";
import { STATUS_CODE } from "#root/code-status.js";
import { User } from "../../../model/user/index.js";

const userSearchRouter = express.Router();
userSearchRouter.get(
  "/user/search",
  query("name").notEmpty().withMessage("Enter a Valid Name "),
  validate,
  async (req, res) => {
    try {
      const { name } = req.query;
      const usersFound = await User.find({ name: name }).lean();
      if (usersFound.length > 0) {
        return res.status(STATUS_CODE.OK).send({
          success: true,
          usersFound,
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
  }
);

export { userSearchRouter };
