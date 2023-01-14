import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "#root/db-connection.js";
import { userRouter } from "#route/user/index.js";
import { facebookPostRouter } from "#route/facebookPost/index.js";
import { facebookCommentRouter } from "./src/route/facebookComment/index.js";
import { commentReactRouter } from "./src/route/facebookReactComment/index.js";
import { postReactRouter } from "./src/route/facebookReackPost/index.js";
import { googleCloudServiceRouter } from "./src/route/googleCloudService/index.js";
import { addFacebookFriendRequestRouter } from "./src/route/friend/index.js";
import { getFriendsNotificationsRouter } from "./src/route/getNotifications/index.js";
import { changeProfilePicRouter } from "./src/route/facebookUserProfile/index.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userRouter);
app.use(commentReactRouter);
app.use(facebookPostRouter);
app.use(facebookCommentRouter);
app.use(postReactRouter);
app.use(googleCloudServiceRouter);
app.use(addFacebookFriendRequestRouter);
app.use(getFriendsNotificationsRouter);
app.use(changeProfilePicRouter);

connectToDB()
  .then(() => {
    console.log("Connected to Mongoose");
    const port = process.env.port;
    app.listen(port, () => {
      console.log(`listening on ${port}' ...`);
    });
  })
  .catch((err) => console.log(err));
