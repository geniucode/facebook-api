import express from "express";
import { query, body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookFriend } from "#model/friend/index.js";
import { User } from "#model/user/index.js";
import { withAuth } from "../../utils/withAuth.js";
import { statusConstants } from "../../model/friend/index.js";
import { STATUS_CODE } from "#root/code-status.js";

const addFacebookFriendRequestRouter = express.Router();

addFacebookFriendRequestRouter.post(
  "/accept-friend-request",
  withAuth,
  body("id"),
  async (req, res) => {
    const { id } = req.body;
    const user = req.user._id;
    try {
      const res = await FacebookFriend.findByIdAndUpdate(id, {
        status: statusConstants.accepted,
      });
      const requester = await User.findOneAndUpdate(
        { _id: res.requester },
        { $push: { friends: user } }
      );
      const recipient = await User.findOneAndUpdate(
        { _id: user },
        { $push: { friends: res.requester } }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
);

addFacebookFriendRequestRouter.post(
  "/reject-friend-request",
  withAuth,
  body("id").isMongoId(),
  async (req, res) => {
    const { id } = req.body;
    try {
      await FacebookFriend.deleteOne({ id });
    } catch (err) {
      console.log(err);
    }
  }
);

addFacebookFriendRequestRouter.post(
  "/update-notification",
  withAuth,
  body("id").isMongoId(),
  async (req, res) => {
    const { id } = req.body;
    try {
      const res = await FacebookFriend.findByIdAndUpdate(id, {
        notification: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
);

addFacebookFriendRequestRouter.post(
  "/friend-request",
  withAuth,
  body("recipient").isMongoId(),
  validate,
  async (req, res) => {
    try {
      const { recipient } = req.body;
      const requester = req.user._id;
      if (requester !== recipient) {
        const sendFriendRequestFirst = await FacebookFriend.findOne({
          requester,
          recipient,
        });

        if (!sendFriendRequestFirst) {
          const newFriendRequest = new FacebookFriend({
            recipient,
            requester,
          });

          await newFriendRequest.save();

          return res.status(STATUS_CODE.OK).send({
            success: true,
            message: "Friend Request sent successfully!",
          });
        } else {
          return res.status(STATUS_CODE.DuplicateOrBad).send({
            success: false,
            message: "You Already sent a friend request for this person!",
          });
        }
      } else {
        return res
          .status(STATUS_CODE.BadInput)
          .json({ message: "you cannot add yourself " });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

addFacebookFriendRequestRouter.get(
  "/check-request",
  withAuth,
  query("recipient").isMongoId(),
  validate,
  async (req, res) => {
    try {
      const { recipient } = req.query;
      const requester = req.user._id;
      const alreadySentRequest = await FacebookFriend.findOne({
        requester,
        recipient,
      });
      console.log(alreadySentRequest);
      if (alreadySentRequest != null) {
        return res.status(STATUS_CODE.OK).send({
          success: true,
          message: "Request Found",
        });
      } else {
        return res.status(STATUS_CODE.BadInput).send({
          success: false,
          message: "Request not Found",
        });
      }
    } catch (error) {
      console.log("the error is", error);
      return res.status(STATUS_CODE.BadInput).send({
        success: false,
        message: "catch error",
      });
    }
  }
);

export { addFacebookFriendRequestRouter };
