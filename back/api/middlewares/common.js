"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const morgan = require("morgan");
exports.default = [
    bodyParser.json(),
    morgan(":method :url :status :res[content-length] - :response-time ms")
];
