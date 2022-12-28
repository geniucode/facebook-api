import express from "express";
import { body } from "express-validator";
import { validate } from "#utils/validator.js";
import { FacebookFriend } from "#model/friend/index.js";
import { User } from "#model/user/index.js";
import { withAuth } from "../../utils/withAuth.js";
import { STATUS_CODE } from "#root/code-status.js";

const addFacebookFriendRequestRouter = express.Router();

addFacebookFriendRequestRouter.post(
  "/friendRequest/:id",
  //withAuth,
  body("senderID").isString(),
  body("receiverID").isString(),
  validate,
  async (req, res) => {
    try {
      if (req.user.id !== req.params.id) {
        const sender = await User.findById(req.user.id);
        const receiver = await User.findById(req.params.id);
        if (
          !receiver.requests.includes(sender._id) &&
          !receiver.friends.includes(sender._id)
        ) {
          await receiver.updateOne({
            $push: requests.sender._id,
          });
          res.json({ message: "friend request has been sent" });
        } else {
          res.status(400).json({ message: "already sent " });
        }
      } else {
        res
          .status(400)
          .json({ message: "you cannot send message to yourself " });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

export { addFacebookFriendRequestRouter };
