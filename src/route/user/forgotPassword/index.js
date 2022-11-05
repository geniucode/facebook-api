// Find User Page
import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import generatedNumber from "../../../utils/generatedNumber.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { STATUS_CODE } from "#root/code-status.js";

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
      const emailExists = await User.findOne({ email: email });
      console.log(emailExists._id);
      console.log(emailExists.id);

      const salt = await bcrypt.genSaltSync(saltRounds);
      const forgetPasswordToken = await bcrypt.hashSync(
        generatedNumber(1),
        salt
      );
      console.log(forgetPasswordToken);

      if (emailExists.id) {
        async function mailVarification() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          let testAccount = await nodemailer.createTestAccount();

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: process.env.mailHost,
            port: process.env.mailPort,
            secure: process.env.mailSecurity, // true for 465, false for other ports

            auth: {
              user: process.env.mailUser, // generated ethereal user
              pass: process.env.mailPassword, // generated ethereal password
            },
          });
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Facebook Inc" forgotpassword@facebook.inc', // sender address
            to: email, // list of receivers
            subject: "Verification code ", // Subject line
            text: `Dear ${email}, <br/> you're Code is  ${forgetPasswordToken} please click on the link below to enter code   `, // plain text body
            html: `Dear ${email}, <br/> you're Code is  ${forgetPasswordToken} please click on the link below to enter code`, // html body
          });

          transporter.verify().then(console.log).catch(console.error);
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        const updatePasswordToken = await User.updateOne(
          { _id: email._id },
          forgetPasswordToken
        );
        await updatePasswordToken.save();

        mailVarification(); // .catch(console.error);
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
