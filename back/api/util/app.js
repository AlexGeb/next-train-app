"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const common_1 = require("../middlewares/common");
const createApp = () => {
    const app = express();
    app.set("trust proxy", 1);
    app.use(...common_1.default);
    return app;
};
exports.default = createApp;
