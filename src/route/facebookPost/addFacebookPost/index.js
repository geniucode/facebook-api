import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookPost } from "#model/facebookPost/index.js";
import { User } from "#model/user/index.js";
import { withAuth } from "../../../utils/withAuth.js";
import { STATUS_CODE } from "#root/code-status.js";

const addFacebookPostRouter = express.Router();

addFacebookPostRouter.post(
  "/facebook-post/add-post",
  withAuth,
  // body("user").notEmpty(),
  body("postBody").isString(),
  body("postImg").isString(),
  validate,
  async (req, res) => {
    try {
      const member = req.user;
      const createdBy = member._id;
      const { user, postBody, postImg } = req.body;
      const userFound = await User.findOne({ _id: user });
      if (userFound) {
        const newPost = new FacebookPost({
          user,
          postBody,
          postImg,
          createdBy,
        });
        await newPost.save();
        res
          .status(STATUS_CODE.OK)
          .send({ success: true, message: "Post added successfully" });
      } else {
        res
          .status(STATUS_CODE.UnAuthorized)
          .send({ success: false, message: "User does not exist" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

addFacebookPostRouter.post(
  "/facebook-post/add-post-with-image",
  withAuth,
  body("postBody").isString(),
  body("postImg").isString(),
  validate,
  async (req, res) => {
    try {
      const member = req.user;
      const user = member._id;
      const { postBody, postImg } = req.body;

      const userFound = await User.findOne({ _id: user });
      if (userFound) {
        const newPost = new FacebookPost({
          user,
          postBody,
          postImg,
        });
        await newPost.save();
        res
          .status(STATUS_CODE.OK)
          .send({ success: true, message: "Post added successfully" });
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

export { addFacebookPostRouter };
