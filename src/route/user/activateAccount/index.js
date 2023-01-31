import express from "express";
import { param } from "express-validator";
import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { PendingUser } from "#model/pendingUser/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const activateAccountRouter = express.Router();

activateAccountRouter.get(
  "/user/activate-account/:hash",
  param("hash").notEmpty().isString().withMessage("hash is needed to activate"),
  validate,
  async (req, res) => {
    try {
      const { hash } = req.params;
      const pendingUserFound = await PendingUser.findOne({ _id: hash }).lean();
      const userFound = await User.findOne({ _id: hash }).lean();

      if (pendingUserFound) {
        const newUser = new User(pendingUserFound);
        await newUser.save();
        await PendingUser.deleteOne({ _id: pendingUserFound._id });
        res.status(STATUS_CODE.OK).send({
          success: true,
          message: "Account activated successfully",
        });
      } else if (userFound) {
        res.status(STATUS_CODE.DuplicateOrBad).send({
          success: false,
          message: "Account is already activated",
        });
      } else {
        res.status(STATUS_CODE.NotFound).send({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.BadInput)
        .send({ success: false, message: "An error has occurred!" });
    }
  }
);

export { activateAccountRouter };
