import express from "express";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookFriend, statusConstants } from "../../model/friend/index.js";
import { withAuth } from "../../utils/withAuth.js";

const getFriendsNotificationsRouter = express.Router();

getFriendsNotificationsRouter.get(
  "/user/friend-notifications",
  withAuth,
  async (req, res) => {
    const recipient = req.user._id;
    try {
      const notificationsFound = await FacebookFriend.find({
        recipient,
        status: statusConstants.pending,
      })
        .populate("requester")
        .lean();

      if (notificationsFound.length > 0) {
        res
          .status(STATUS_CODE.OK)
          .send({ success: true, notifications: notificationsFound });
      } else {
        res
          .status(STATUS_CODE.NotFound)
          .send({ success: false, message: "no notifications" });
      }
    } catch (error) {
      res
        .status(STATUS_CODE.DuplicateOrBad)
        .send({ success: false, message: "Wrong input" });
    }
  }
);

export { getFriendsNotificationsRouter };
