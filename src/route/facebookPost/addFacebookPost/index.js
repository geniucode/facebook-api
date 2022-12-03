import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookPost } from "#model/facebookPost/index.js";
import { User } from "#model/user/index.js";

const addFacebookPostRouter = express.Router();

addFacebookPostRouter.post(
  "/facebook-post/add-post",
  body("user").notEmpty().withMessage("User is required to post"),
  body("postBody").isString(),
  body("postImg").isString(),
  validate,
  async (req, res) => {
    try {
      const { user, postBody, postImg } = req.body;
      const userFound = await User.findOne({ _id: user });
      if (userFound) {
        const newPost = new FacebookPost({
          user,
          postBody,
          postImg,
        });
        await newPost.save();
        res.send({
          success: true,
          message: "Post added successfully",
        });
      } else {
        res
        .status(STATUS_CODE.UnAuthorized)
        .send({ success: false, error, message: "User does not exist" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, error, message: "wrong input" });
    }
  }
);

export { addFacebookPostRouter };
