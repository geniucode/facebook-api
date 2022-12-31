import express from "express";
import { query } from "express-validator";
import { STATUS_CODE } from "#root/code-status.js";
import { User } from "../../model/user/index.js";
import { FacebookFriend } from "../../model/friend/index.js";

const getNotificationsRouter = express.Router();

getNotificationsRouter.get("/user/notifications", async (req, res) => {
  const { user } = req.query;
  try {
    const userFound = await User.findOne({
      _id: user,
    });

    const notificationsFound = await FacebookFriend.find()
      .populate("requester")
      .where({
        recipient: userFound._id,
        notification: false,
      });

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
});

export { getNotificationsRouter };
