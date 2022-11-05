import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";

const userLoginRouter = express.Router();

userLoginRouter.post(
  "/user/login",
  body("email").isEmail(),
  body("password").notEmpty().isString(),
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      const isEqualWith = await bcrypt.compare(password, userFound.password);
      if (isEqualWith) {
        const jwtToken = jwt.sign(
          { email: userFound.email },
          "SecretKey",
          { expiresIn: 86400 }
        );
        res.send({ sucess: true, jwtToken});
      } else {
        res.send({ sucess: false });
      }
    } else {
      res.send({ sucess: false });
    }
  }
);

export { userLoginRouter };
