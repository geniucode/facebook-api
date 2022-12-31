import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookFriend } from "#model/friend/index.js";
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
  "/friendRequest",
  withAuth,
  body("senderID").isString(),
  body("receiverID").isString(),
  validate,
  async (req, res) => {
    try {
      const { senderID, receiverID } = req.body;
      const sender = await User.findById(senderID);
      const receiver = await User.findById(receiverID);
      if (senderID !== receiverID) {
        const sendFriendRequestFirst = await FacebookFriend.findOne({
          requester: sender,
          recipient: receiver,
        });

        if (!sendFriendRequestFirst) {
          const newFriendRequest = new FacebookFriend({
            recipient: receiver,
            requester: sender,
            status: 1,
            notification: false,
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

export { addFacebookFriendRequestRouter };
