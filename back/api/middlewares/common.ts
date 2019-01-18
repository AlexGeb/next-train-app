import * as bodyParser from "body-parser";
import * as morgan from "morgan";

export default [
  bodyParser.json(),
  morgan(":method :url :status :res[content-length] - :response-time ms")
];
