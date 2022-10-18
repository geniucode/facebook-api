import express from "express";
import { query, body, validationResult } from "express-validator";
import emailValidator from "email-validator";
import { User } from "../../../model/user/index.js";
import bcrypt from "bcrypt";
import statusCodes from "../../../code-status.js";

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

  async (req, res) => {
    try {
      const { email, gender, password, age, country } = req.body;

      if (email.length && gender.length && password.length && country.length && country.length) {
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
          res.status(statusCodes.NotFound).send({
            message: "Please enter a Valid email address ",
          });
        }
      } else {
        return res.status(statusCodes.NotFound).send({
          message: "Missing Required Field ",
        });
      }
    } catch (error) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.send("already added ");
    }
  }
);

export { userSignupRouter };
