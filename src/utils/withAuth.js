import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const accessTokenSecret = "SecretKey"; //i need to know it
export const withAuth = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(" ")[1];
    try {
      const user = await jwt.verify(token, process.env.jwtSecret);
      req.user = user;
      next();
    } catch (e) {
      res.send({
        message: "Invalid token",
      });
    }
  } else {
    res.send({
      message: "Need Authorization",
    });
  }
};
