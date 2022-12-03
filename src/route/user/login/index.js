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
        res.send({ success: true, jwtToken,message: "login successful,correct username and password  "});
      } else {
        res.send({ success: false,message: "correct username but wrong password" });
      }
    } else {
      res.send({ success: false,message: " username/email not found " });
    }
  }
);

export { userLoginRouter };
