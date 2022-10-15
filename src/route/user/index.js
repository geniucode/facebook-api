import express from "express";

const userRouter = express.Router();

userRouter.get("/user", (req, res) => {
  res.send({ sucess: true });
});

export { userRouter };
