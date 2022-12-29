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
  withAuth,
  body("senderID")
    .notEmpty()
    .withMessage("senderID is required")
    .isString()
    .withMessage("Please enter a valid senderID is required"),
  body("receiverID")
    .notEmpty()
    .withMessage("receiverID is required")
    .isString()
    .withMessage("Please enter a valid receiverID is required"),
  validate,
  async (req, res) => {
    const { senderID, receiverID } = await req.body;
    try {
      if (senderID !== receiverID) {
        const sender = await User.findById(senderID);
        const receiver = await User.findById(receiverID);
        const requestFound = FacebookFriend.find({
          "requests._id": senderID,
        });
        const friendsFound = FacebookFriend.find({
          "friends._id": senderID,
        });
        if (
          (!FacebookFriend.User._id === receiverID &&
            !FacebookFriend.User.requests.includes(sender._id)) ||
          (!FacebookFriend.User._id === receiverID &&
            !FacebookFriend.friends.includes(sender._id))
        ) {
          // console.log(requestFound);
          // if (requestFound.length === 0 && friendsFound.length === 0) {

          // await receiver.updateOne({
          //   $push: requests.sender._id,
          // });
          res.json({ message: "Friend request has been sent" });
        } else {
          res.status(400).json({ message: "Friend request already sent" });
        }
      } else {
        res
          .status(400)
          .json({ message: "You cannot send a friend request to yourself " });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

export { addFacebookFriendRequestRouter };
