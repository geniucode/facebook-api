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
  body("email").notEmpty().isEmail().withMessage("Please enter a valid email"),
  body("gender").notEmpty().isString().withMessage("male or female"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
  body("birthDay").notEmpty().isString(),
  body("country")
    .notEmpty()
    .isString()
    .withMessage("please enter a valid country name "),
  validate,
  async (req, res) => {
    try {
      const { email, gender, password, birthDay, country } = req.body;
      const ageFinder = ageFunction(birthDay); //age Finder
      const userFound = await User.findOne({ email: email });
      if (userFound) {
        res
          .status(STATUS_CODE.BadInput)
          .send({ success: false, message: "Email is already in use" });
        return;
      }
      console.log("age is: ", ageFunction(birthDay));
      if (ageFinder >= process.env.minage) {
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
      res.status(STATUS_CODE.DuplicateOrBad).send({ success: false, error });
    }
  }
);

export { userSignupRouter };
