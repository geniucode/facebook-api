import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validate } from "../../../utils/validator.js";
import { User } from "../../../model/user/index.js";
import { STATUS_CODE } from "../../../../code-status.js";
import ageFunction from "../../../utils/ageFunction.js";

const saltRounds = process.env.saltRounds;
const userSignupRouter = express.Router();

userSignupRouter.post(
  "/user/signup",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("gender").isString().withMessage("male or female"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
  body("birthDay").isString(),
  body("country").isString().withMessage("please enter a valid country name "),
  validate,
  async (req, res) => {
    try {
      const { email, gender, password, birthDay, country } = req.body;
      const ageFinder = ageFunction(birthDay); //age Finder

      console.log("age is: ", ageFunction(birthDay));
      if (age >= process.env.age) {
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(password, salt);
        const newUser = new User({
          email,
          gender,
          password: hash,
          birthDay,
          country,
          forgetPasswordToken: hash,
        });

        await newUser.save();
        res.send({
          success: true,
        });
      } else {
        res.status(STATUS_CODE.BadInputs).send({ success: false });
      }
    } catch (error) {
      res.status(STATUS_CODE.DuplicateOrBad).send({ success: false });
    }
  }
);

export { userSignupRouter };
