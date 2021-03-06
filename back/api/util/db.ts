import { MongoClient } from "mongodb";

const MONGODB_ADDON_URI =
  process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017";
const DB_NAME = "b2tldipfksar9fs";

export const getDb = () =>
  MongoClient.connect(
    MONGODB_ADDON_URI,
    { useNewUrlParser: true }
  ).then(client => client.db(DB_NAME));
