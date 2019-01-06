"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MONGODB_ADDON_URI = process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017";
const DB_NAME = "b2tldipfksar9fs";
exports.getDb = () => mongodb_1.MongoClient.connect(MONGODB_ADDON_URI, { useNewUrlParser: true }).then(client => client.db(DB_NAME));
