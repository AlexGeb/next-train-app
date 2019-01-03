const { MongoClient } = require("mongodb");

const MONGODB_ADDON_URI =
  process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017";
const DB_NAME = "b2tldipfksar9fs";

const getDb = callback => {
  MongoClient.connect(
    MONGODB_ADDON_URI,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err;
      db = client.db(DB_NAME);
      callback(db, client);
    }
  );
};

module.exports = { getDb };
