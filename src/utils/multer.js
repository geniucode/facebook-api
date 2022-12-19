import util from "util";
import Multer from "multer";
const maxSize = 2 * 1024 * 1024;

let processFile = Multer({
  //multer is to process and handle multi data which will be upload
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile); //makes the exported middleware object can be used with async-await
//module.exports = processFileMiddleware;
export { processFileMiddleware };
