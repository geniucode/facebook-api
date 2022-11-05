// Find User Page
import express from "express";
import generatedNumber from "../../../utils/generatedNumber.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";

import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { STATUS_CODE } from "#root/code-status.js";
import { mailVarification } from "#utils/mailer.js";

const saltRounds = process.env.saltRounds;

const userForgotPasswordRouter = express.Router();

userForgotPasswordRouter.post(
  "/user/forgot-password",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  validate,
  async (req, res) => {
    try {
      const { email } = req.body;
      const emailExists = await User.findOne({ email }).lean();
      console.log(emailExists._id);
      console.log(emailExists.id);

      const salt = await bcrypt.genSaltSync(saltRounds);
      const forgetPasswordToken = await bcrypt.hashSync(
        generatedNumber(1),
        salt
      );
      console.log(forgetPasswordToken);

      if (emailExists._id) {
        mailVarification({
          from: '"Facebook Inc" forgotpassword@facebook.inc', // sender address
          to: email, // list of receivers
          subject: "Verification code ", // Subject line
          text: `Dear ${email}, <br/> you're Code is  ${forgetPasswordToken} please click on the link below to enter code   `, // plain text body
          html: `Dear ${email}, <br/> you're Code is  ${forgetPasswordToken} please click on the link below to enter code`, // html body
        });

        const updatePasswordToken = await User.updateOne(
          { _id: emailExists._id },
          { forgetPasswordToken }
        );
        console.log(updatePasswordToken);
        res.status(STATUS_CODE.OK).send({ success: true });
      } else {
        res.status(STATUS_CODE.BadInputs).send({ success: false });
      }
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({ success: false });
    }
  }
);

export { userForgotPasswordRouter };
