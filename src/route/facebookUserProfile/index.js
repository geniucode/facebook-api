import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { User } from "#model/user/index.js";
import { STATUS_CODE } from "#root/code-status.js";
import { withAuth } from "../../utils/withAuth.js";
import controller from "../../controller/file.controller.js";
import { UserProfile } from "../../model/userProfilePic/index.js";

const changeProfilePicRouter = express.Router();
changeProfilePicRouter.put(
  "/change-profile-pic",
  withAuth,
  body("profilePic").isString(),
  validate,
  async (req, res) => {
    try {
      const member = req.user;
      const user = member._id;
      const { profilePic } = req.body;

      const userFound = await User.findOne({ _id: user }).lean();
      if (userFound) {
        const userProfilePic = await User.updateOne(
          {
            _id: userFound._id,
          },
          {
            profilePic,
          }
        );
        res
          .status(STATUS_CODE.OK)
          .send({ success: true, message: "Profile has been changed" });
      } else {
        res
          .status(STATUS_CODE.UnAuthorized)
          .send({ success: false, message: "User does not exist" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: error.message });
    }
  }
);

export { changeProfilePicRouter };
