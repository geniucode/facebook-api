import { util } from "util";
import Multer from "multer";

const util = require("util");
const Multer = require("multer");

let processFile = Multer({
  storage: Multer.memoryStorage(),
}).single("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
