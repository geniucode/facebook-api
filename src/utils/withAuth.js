import jwt from "jsonwebtoken";

const accessTokenSecret = "SecretKey"; //i need to know it
export const withAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(req.headers)
  if (token) {
    token = token.split(" ")[1];
    try {
      const user = await jwt.verify(token, accessTokenSecret);
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
