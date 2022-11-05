import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const saltRounds = 10;
const userSignupRouter = express.Router();

userSignupRouter.post(
  "/user/signup",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("gender").isString().notEmpty().withMessage("male or female"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
  body("birthDay")
    .isString()
    .notEmpty()
    .custom((value) => {
      const date = new Date(value);
      const timestamp = date.getTime();
      if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        return false;
      }
      return date.toISOString().substring(0,10) === value;
    })
    .withMessage("please enter a valid date value"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("please enter a valid country name"),
  validate,
  async (req, res) => {
    try {
      const { email, gender, password, birthDay, country } = req.body;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hashSync(password, salt);
      const newUser = new User({
        email,
        gender,
        password: hash,
        birthDay: new Date(birthDay),
        country,
      });
      await newUser.save();
      res.send({
        success: true,
      });
    } catch (error) {
      res.status(STATUS_CODE.DuplicateOrBad).send({ success: false });
    }
  }
);

export { userSignupRouter };
