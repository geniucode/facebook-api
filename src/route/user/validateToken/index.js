import jwt from "jsonwebtoken";
import express from "express";
import { STATUS_CODE } from "#root/code-status.js";
const accessTokenSecret = "SecretKey"; //i need to know it
const validateTokenRouter = express.Router();
validateTokenRouter.post("/validate-token", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(STATUS_CODE.Forbidden).send({ seccuss: false });
        // The HTTP 403 Forbidden response status code indicates that the
        //  server understands the request but refuses to authorize it.
      }
      //req.user = user; it must if i need use token data in another route like const {username}=req.user
      res.send({ seccuss: true, user });
    });
  } else {
    res.status(STATUS_CODE.UnAuthorized).send({ seccuss: false });
    // indicates that the client request has not been
    // completed because it lacks valid authentication credentials
  }
});

export { validateTokenRouter };
