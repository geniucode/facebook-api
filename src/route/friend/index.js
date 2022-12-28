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
        const sender = await User.findById(senderID);
        const receiver = await User.findById(receiverID);
        const FacebookFriends = await FacebookFriend.findOne({
          user: { name: receiver.name },
          friends: senderID,
        });
        const FacebookFriendsRequest = await FacebookFriend.findOne({
          user: { name: receiver.name },
          requests: senderID,
          // }).populate({
          //   path: "requests",
          //   match: {
          //     user: { _id: receiverID },
          //     requests: { requests: senderID },
          //   },
        });
        // }).populate({
        //   path: "requests",
        //   match: { requests: senderID },
        // .populate("requests")
        // .where(requests === senderID);
        if (FacebookFriends) {
          console.log(FacebookFriends);
          return res.send("You are already friends");
        }
        if (FacebookFriendsRequest) {
          console.log(FacebookFriendsRequest);
          return res.send("You already sent a friend request");
        } else {
          const newRequest = new FacebookFriend({
            usere: receiver,
            requests: senderID,
          });
          await newRequest.save();
          return res.send("Friend request sent successfully");
        }

        // if (
        //   !FacebookFriend.receiver.requests.includes(sender._id) &&
        //   !FacebookFriend.receiver.friends.includes(sender._id)
        // ) {
        //   await receiver.updateOne({
        //     $push: requests.sender._id,
        //   });
        //   res.json({ message: "friend request has been sent" });
        // } else {
        //   res.status(400).json({ message: "already sent " });
        // }
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
