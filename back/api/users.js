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
const mongodb_1 = require("mongodb");
const db_1 = require("./utils/db");
const requestHelper_1 = require("./utils/requestHelper");
const getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { query } = url_1.parse(req.url, true);
        const { _id } = query;
        const mongodbQuery = typeof _id === "string" ? { _id: new mongodb_1.ObjectID(_id) } : {};
        const db = yield db_1.getDb();
        const users = yield db
            .collection("users")
            .find(mongodbQuery)
            .toArray();
        res.end(JSON.stringify(users));
    }
    catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error }));
    }
});
const postUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const body = yield requestHelper_1.getJsonBody(req);
        const db = yield db_1.getDb();
        const insertResult = yield db.collection("users").insertMany(body);
        res.end(JSON.stringify(insertResult));
    }
    catch (error) {
        console.error(error);
        res.statusCode = 400;
        res.end(JSON.stringify(error));
    }
});
const deleteUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const db = yield db_1.getDb();
        const { query } = url_1.parse(req.url, true);
        const { _id } = query;
        let deleteResult;
        if (typeof _id === "string") {
            deleteResult = yield db
                .collection("users")
                .deleteOne({ _id: new mongodb_1.ObjectID(_id) });
        }
        else {
            deleteResult = yield db.collection("users").deleteMany({});
        }
        res.end(JSON.stringify(deleteResult));
    }
    catch (error) {
        console.error(error);
        res.statusCode = 400;
        res.end(JSON.stringify(error));
    }
});
module.exports = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { method } = req;
    switch (method) {
        case "GET":
            getUsers(req, res);
            break;
        case "POST":
            postUsers(req, res);
            break;
        case "DELETE":
            deleteUsers(req, res);
            break;
        default:
            res.statusCode = 405;
            res.end();
            break;
    }
};
