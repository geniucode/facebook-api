import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
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
          {
            _id: userFound._id,
            email: userFound.email,
            name: userFound.name,
            gender: userFound.gender,
            birthDay: userFound.birthDay,
            country: userFound.country,
            pending: userFound.pending,
            profilePic: userFound.profilePic,
            coverPhoto: userFound.coverPhoto,
          },
          process.env.jwtSecret,
          { expiresIn: 86400 }
        );
        res.send({
          success: true,
          jwtToken,
          message: "login successful,correct username and password  ",
        });
      } else {
        res.send({
          success: false,
          message: "correct username but wrong password",
        });
      }
    } else {
      res.send({ success: false, message: "User not found " });
    }
  }
);

export { userLoginRouter };
