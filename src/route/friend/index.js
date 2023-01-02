import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookFriend, statusConstants } from "#model/friend/index.js";
import { User } from "#model/user/index.js";
import { withAuth } from "../../utils/withAuth.js";
import { STATUS_CODE } from "#root/code-status.js";

const addFacebookFriendRequestRouter = express.Router();

addFacebookFriendRequestRouter.post(
  "/updateNotifications",
  withAuth,
  body("notifications"),
  async (req, res) => {
    const { notifications } = req.body;
    try {
      notifications.map(async (notification) => {
        await FacebookFriend.findByIdAndUpdate(notification._id, {
          notification: true,
        });
      });
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

addFacebookFriendRequestRouter.post(
  "/cancel-friend-request",
  withAuth,
  body("recipient").isMongoId(),
  validate,
  async (req, res) => {
    try {
      const { recipient } = req.body;
      const requester = req.user._id;

      if (alreadySentFriendRequest) {
        const cancelFriendRequest = await FacebookPost.findOneAndDelete({
          requester,
          recipient,
        });
        if (cancelFriendRequest) {
          return res.status(STATUS_CODE.OK).send({
            success: true,
            message: "Friend Request was Cancelled Successfully",
          });
        }
      } else {
        return res.status(STATUS_CODE.DuplicateOrBad).send({
          success: false,
          message: "Friend request cannot be deleted because it's not found ",
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

addFacebookFriendRequestRouter.post(
  "/ignore-friend-request",
  withAuth,
  body("requester").isMongoId(),
  validate,
  async (req, res) => {
    try {
      const { requester } = req.body;
      const recipient = req.user._id;

      if (alreadySentFriendRequest) {
        const ignoreFriendRequest = await FacebookPost.findOneAndDelete({
          requester,
          recipient,
        });
        if (ignoreFriendRequest) {
          return res.status(STATUS_CODE.OK).send({
            success: true,
            message: "Friend Request was ignored Successfully",
          });
        }
      } else {
        return res.status(STATUS_CODE.DuplicateOrBad).send({
          success: false,
          message: "Friend request cannot be ignored  because it's not found ",
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

addFacebookFriendRequestRouter.post(
  "/accept-friend-request",
  withAuth,
  body("requester").isMongoId(),
  validate,
  async (req, res) => {
    try {
      const { requester } = req.body;
      const recipient = req.user._id;
      if (requester !== recipient) {
        const pendingFriendRequest = await FacebookFriend.findOne({
          requester,
          recipient,
          status: pending,
        });

        if (pendingFriendRequest) {
          const acceptNewFriendRequest = await FacebookPost.findByIdAndUpdate(
            pendingFriendRequest._id,
            { recipient, requester, status: accepted }
          );

          return res.status(STATUS_CODE.OK).send({
            success: true,
            message: "Friend is successfully added !",
          });
        } else {
          return res.status(STATUS_CODE.DuplicateOrBad).send({
            success: false,
            message: "You are already a friend with this person!",
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

export { addFacebookFriendRequestRouter };
