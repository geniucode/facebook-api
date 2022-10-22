import express from "express";
import { body } from "express-validator";
import { validate } from "../../../utils/validator.js";
import { User } from "../../../model/user/index.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { STATUS_CODE } from "../../../../code-status.js";

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
      if (emailExists) {
        const saltRounds = 10;
        const password = "123";
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        await User.updateOne({ email: email }, { password: hashedPassword });
        //send the email
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          let testAccount = await nodemailer.createTestAccount();

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "merndevs4@gmail.com", // generated ethereal user
              pass: "euqnplfwwgpaylfx", // generated ethereal password
            },
          });
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Facebook Inc" forgotpassword@facebook.inc', // sender address
            to: email, // list of receivers
            subject: "Change Password", // Subject line
            text: `Dear ${email}, <br/> you're password has been changed to: 123`, // plain text body
            html: `Dear ${email}, <br/> you're password has been changed to: 123`, // html body
          });

          transporter.verify().then(console.log).catch(console.error);
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);

        res.status(STATUS_CODE.OK).send({ success: true });
      } else {
        res.status(STATUS_CODE.BadInput).send({ success: false });
      }
    } catch (error) {
      res.status(STATUS_CODE.BadInput).send({ success: false });
    }
  }
);

export { userForgotPasswordRouter };
