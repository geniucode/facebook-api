import { util } from "util";
import Multer from "multer";

let processFile = Multer({
  storage: Multer.memoryStorage(),
}).single("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
