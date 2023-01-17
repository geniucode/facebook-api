import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ageFunction from "../../../utils/ageFunction.js";
import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const saltRounds = process.env.saltRounds;
const userSignupRouter = express.Router();

userSignupRouter.post(
  "/user/signup",
  body("name")
    .notEmpty()
    .isString()
    .custom((value) => value != " ")
    .withMessage("Please enter a valid user name"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("gender").notEmpty().withMessage("male or female"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
  body("birthDay")
    .isString()
    .custom((value) => {
      const date = new Date(value);
      const timestamp = date.getTime();
      if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        return false;
      }
      return (
        date.toISOString().substring(0, 10) === value &&
        ageFunction(value) >= process.env.minage
      );
    })
    .withMessage("age is less than approved or invalid date value"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("please enter a valid country name"),
  validate,
  async (req, res) => {
    try {
      const { name, email, gender, password, birthDay, country } = req.body;
      const userFound = await User.findOne({ email });
      if (userFound) {
        res.status(STATUS_CODE.BadInput).send({
          success: false,
          errors: [
            { value: email, param: "email", msg: "Email is already in use" },
          ],
        });
        return;
      }

      const salt = await bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hashSync(password, salt);
      const newUser = new User({
        name,
        email,
        gender,
        password: hash,
        birthDay,
        country,
        forgetPasswordToken: "",
        coverPhoto: "",
      });

      await newUser.save();
      res.send({
        success: true,
        message: "user is added sucessfully",
      });
    } catch (error) {
      res.status(STATUS_CODE.DuplicateOrBad).send({
        success: false,
        error,
        message: "wrong input,catch error return ",
      });
    }
  }
);

export { userSignupRouter };
