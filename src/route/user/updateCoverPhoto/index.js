import express from "express";
import { body } from "express-validator";
import { STATUS_CODE } from "#root/code-status.js";
import { User } from "#model/user/index.js";
import { validate } from "#utils/validator.js";
import { withAuth } from "#utils/withAuth.js";

const userUpdateCoverPhotoRouter = express.Router();

userUpdateCoverPhotoRouter.post(
  "/user/update-cover-photo",
  withAuth,
  body("coverPhoto").isString(),
  validate,
  async (req, res) => {
    try {
      const user = req.user;
      const { coverPhoto } = req.body;
      const userFound = await User.findOne({ _id: user._id });
      if (!userFound) {
        res
          .status(STATUS_CODE.NotFound)
          .send({ success: false, message: "User not found" });
      } else {
        const updated = await User.updateOne({ _id: user._id }, { coverPhoto });
        if (!updated) {
          res
            .status(STATUS_CODE.DuplicateOrBad)
            .send({ success: false, message: "Cover photo could not updated" });
        } else {
          res.status(STATUS_CODE.OK).send({
            success: true,
            message: "Cover photo updated successfully",
          });
        }
      }
    } catch (err) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

export { userUpdateCoverPhotoRouter };
