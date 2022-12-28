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
      console.log("senderID is", senderID);
      console.log("receiverID is", receiverID);
      if (senderID !== receiverID) {
        const sender = await User.findById(senderID);
        const receiver = await User.findById(receiverID);
        console.log("sender is: ", sender);
        console.log("receiver is: ", receiver);
        if (
          !receiver.requests.includes(sender._id) &&
          !receiver.friends.includes(sender._id)
        ) {
          await receiver.updateOne({
            $push: requests.sender._id,
          });
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
