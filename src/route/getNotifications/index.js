import express from "express";
import { query } from "express-validator";
import { STATUS_CODE } from "#root/code-status.js";
import { FacebookFriend } from "../../model/friend/index.js";

const getNotificationsRouter = express.Router();

getNotificationsRouter.get("/user/notifications", async (req, res) => {
  const { user } = req.query;
  try {
    const notificationsFound = await FacebookFriend.find({
      recipient: user,
      notification: false,
    });
    console.log(notificationsFound);
    if (notificationsFound) {
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
