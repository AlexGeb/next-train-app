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
const app_1 = require("./util/app");
const sncf_1 = require("./services/sncf");
const searchStation = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { q, stopAreaId } = req.query;
    if (typeof q === "string") {
        try {
            const searchResults = yield sncf_1.getPossibleItems(q);
            res.json(searchResults);
            return;
        }
        catch (error) {
            res.statusCode = 400;
            res.json(error);
            return;
        }
    }
    else if (typeof stopAreaId === "string") {
        try {
            const departures = yield sncf_1.getNextDepartures(stopAreaId);
            res.json(departures);
        }
        catch (error) {
            res.statusCode = 400;
            res.json(error);
            return;
        }
    }
    else {
        res.statusCode = 400;
        res.json({ error: "No query or stop area id specified" });
        return;
    }
});
const app = app_1.default();
app.get("*", (req, res) => {
    searchStation(req, res);
});
module.exports = app;
