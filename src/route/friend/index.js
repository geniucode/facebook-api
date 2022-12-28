import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookFriend } from "#model/friend/index.js";
import { User } from "#model/user/index.js";
import { withAuth } from "../../utils/withAuth.js";
import { STATUS_CODE } from "#root/code-status.js";

const addFacebookFriendRequestRouter = express.Router();

addFacebookFriendRequestRouter.post(
  "/friendRequest",
  //withAuth,
  body("senderID").isString(),
  body("receiverID").isString(),
  validate,
  async (req, res) => {
    try {
      const { senderID, receiverID } = req.body;
      if (senderID !== receiverID) {
        const sendFriendRequestFirst = await FacebookFriend.findOne({
          requester: senderID,
          recipient: receiverID,
        });
        if (!sendFriendRequestFirst) {
          const sendFriendRequest = await FacebookFriend.findOneAndUpdate(
            { requester: senderID, recipient: receiverID },
            { $set: { status: 1, notification: false } },
            { upsert: true, new: true }
          );
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
        // const getFriendRequestFirst = await FacebookFriend.findOne({
        //   recipient: senderID,
        //   requester: receiverID,
        // });
        // if (!getFriendRequestFirst) {
        //   await FacebookFriend.findOneAndUpdate(
        //     { recipient: senderID, requester: receiverID },
        //     { $set: { status: 2 } },
        //     { upsert: true, new: true }
        //   );
        //   return res.status(STATUS_CODE.OK).send({
        //     success: true,
        //     message: "Friend request sent successfully!",
        //   });
        // } else {
        //   return res.status(STATUS_CODE.DuplicateOrBad).send({
        //     success: false,
        //     message: "You Already sent a friend request for this person!",
        //   });
        // }
      } else {
        return res
          .status(STATUS_CODE.BadInput)
          .json({ message: "you cannot add yourself " });
      }
    } catch (error) {
      return res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

export { addFacebookFriendRequestRouter };
