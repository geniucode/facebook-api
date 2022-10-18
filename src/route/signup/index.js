import express from "express";
import { body, validationResult } from "express-validator";
import emailValidator from "email-validator";
import { User } from "../../../model/user/index.js";
import bcrypt from "bcrypt";
import { validate } from "../../utils/validator.js";
import { STATUS_CODE } from "../../../code-status.js";

const saltRounds = 10;
const userSignupRouter = express.Router();

userSignupRouter.post(
  "/signup",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("gender").isString().withMessage("male or female"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
  body("age")
    .isNumeric("age" < 16)
    .withMessage("from 16 years old "),
  body("country").isString().withMessage("please enter a valid country name "),
  validate,
  async (req, res) => {
    try {
      const { email, gender, password, age, country } = req.body;
      if (emailValidator.validate(email)) {
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(password, salt);
        const newUser = new User({
          email,
          gender,
          password: hash,
          age,
          country,
        });

        await newUser.save();
        res.send({
          message: "email is Valid and all data are successfully",
        });
      } else {
        res.status(STATUS_CODE.NotFound).send({
          message: "Please enter a Valid email address ",
        });
      }
    } catch (error) {
      res.send("already added ");
    }
  }
);

export { userSignupRouter };
