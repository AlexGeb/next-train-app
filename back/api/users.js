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
const mongodb_1 = require("mongodb");
const db_1 = require("./util/db");
const app_1 = require("./util/app");
const getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { _id } = req.query;
        const mongodbQuery = typeof _id === "string" ? { _id: new mongodb_1.ObjectID(_id) } : {};
        const db = yield db_1.getDb();
        const users = yield db
            .collection("users")
            .find(mongodbQuery)
            .toArray();
        res.json(users);
    }
    catch (error) {
        res.statusCode = 400;
        res.json({ error });
    }
});
const postUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const db = yield db_1.getDb();
        const insertResult = yield db.collection("users").insertMany(req.body);
        res.json(insertResult.insertedIds);
    }
    catch (error) {
        res.statusCode = 400;
        res.json(error);
    }
});
const deleteUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const db = yield db_1.getDb();
        const { _id } = req.query;
        let deleteResult;
        if (typeof _id === "string") {
            deleteResult = yield db
                .collection("users")
                .deleteOne({ _id: new mongodb_1.ObjectID(_id) });
        }
        else {
            deleteResult = yield db.collection("users").deleteMany({});
        }
        res.json(deleteResult);
    }
    catch (error) {
        res.statusCode = 400;
        res.json(error);
    }
});
const app = app_1.default();
app.get("*", (req, res) => {
    getUsers(req, res);
});
app.post("*", (req, res) => {
    postUsers(req, res);
});
app.delete("*", (req, res) => {
    deleteUsers(req, res);
});
module.exports = app;
