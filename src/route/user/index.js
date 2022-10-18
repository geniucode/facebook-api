import express from "express";
import { query, body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../../model/user/index.js";

const userRouter = express.Router();

userRouter.post(
  "/user/login",
  body("email").isEmail(),
  body("passowrd").isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const userFound = await User.findOne({ email: email });
      if (userFound) {
        const isEqualWith = await bcrypt.compare(password, userFound.password);
        if (isEqualWith) {
          res.send({ sucess: true });
        } else {
          res.send({ sucess: false });
        }
      } else {
        res.send({ sucess: false });
      }
    }
  }
);

export { userRouter };
