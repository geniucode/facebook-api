import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import { STATUS_CODE } from "#root/code-status.js";

const validateTokenRouter = express.Router();

validateTokenRouter.post("/validate-token", (req, res) => {
  const token = req.body.jwtToken;
  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if (err) {
      return res.status(STATUS_CODE.Forbidden).send({ success: false });
      // The HTTP 403 Forbidden response status code indicates that the
      //  server understands the request but refuses to authorize it.
    }
    //req.user = user; it must if i need use token data in another route like const {username}=req.user
    res.send({ success: true, user });
  });
});

export { validateTokenRouter };
