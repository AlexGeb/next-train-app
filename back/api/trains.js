"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const sncf_1 = require("./services/sncf");
const searchStation = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { query } = url_1.parse(req.url, true);
    const { q, stopAreaId } = query;
    if (typeof q === "string") {
        try {
            const searchResults = yield sncf_1.getPossibleItems(q);
            res.end(JSON.stringify(searchResults));
            return;
        }
        catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify(error));
            return;
        }
    }
    else if (typeof stopAreaId === "string") {
        try {
            const departures = yield sncf_1.getNextDepartures(stopAreaId);
            res.end(JSON.stringify(departures));
        }
        catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify(error));
            return;
        }
    }
    else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "No query or stop area id specified" }));
        return;
    }
});
module.exports = (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.setHeader("Content-Type", "application/json");
    const { method } = req;
    switch (method) {
        case "GET":
            searchStation(req, res);
            break;
        default:
            res.statusCode = 405;
            res.end();
            break;
    }
});
