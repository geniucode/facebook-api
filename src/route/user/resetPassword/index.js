import express from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { body } from "express-validator";
import { validate } from "../../../utils/validator.js";
import { User } from "../../../model/user/index.js";
import { STATUS_CODE } from "../../../../code-status.js";
const saltRounds = process.env.saltRounds;
const userResetPasswordRouter = express.Router();

userResetPasswordRouter.get(
  "/user/reset-password",
  body("forgetPasswordToken").notEmpty().withMessage("Enter a Valid Token "),
  validate,
  async (req, res) => {
    try {
      const { forgetPasswordToken } = req.query;
      const tokenFound = await User.findOne({
        forgetPasswordToken: forgetPasswordToken,
      });
      if (tokenFound.id) {
        res.status(STATUS_CODE.OK).send({ success: true });
      } else {
        res.status(STATUS_CODE.BadInput).send({ success: false });
      }
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({ success: false });
    }
  }
);

userResetPasswordRouter.post(
  "/user/reset-password",
  body("password")
    .isStrongPassword()
    .withMessage(
      "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
  body("forgetPasswordToken").notEmpty().withMessage("Code from Email Should be Entered "),

  validate,
  async (req, res) => {
    try {
      const { forgetPasswordToken, password } = req.body;
      const tokenFound = await User.findOne({
        forgetPasswordToken: forgetPasswordToken,
      });

      if (tokenFound.id) {
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(password, salt);

        const updatePassword = await User.updateOne(
          { _id: tokenFound._id },
          { password: hash }
        );
        await updatePassword.save();

        res.status(STATUS_CODE.OK).send({ success: true });
      } else {
        res.status(STATUS_CODE.BadInput).send({ success: false });
      }
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({ success: false });
    }
  }
);

export { userResetPasswordRouter };
