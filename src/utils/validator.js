import { validationResult } from "express-validator";
import { STATUS_CODE } from "../../code-status.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CODE.BadInput).json({ errors: errors.array() });
  } else {
    next();
  }
};
