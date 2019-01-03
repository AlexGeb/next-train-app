const { parse } = require("url");
const { MongoClient } = require("mongodb");

const MONGODB_ADDON_URI = process.env.MONGODB_ADDON_URI
  ? process.env.MONGODB_ADDON_URI
  : "mongodb://localhost:27017";
const DB_NAME = "b2tldipfksar9fs";

const client = new MongoClient(MONGODB_ADDON_URI);

module.exports = (req, res) => {
  const { query } = parse(req.url, true);
  const { name = "World" } = query;

  client.connect(
    err => {
      if (err)
        throw Error(
          "Error trying to connect to database using uri " + MONGODB_ADDON_URI
        );
      console.log("Connected successfully to server");
      const db = client.db(DB_NAME);
      const userCollection = db.collection("user");
      userCollection.find({}).toArray((err, users) => {
        if (err) {
          throw Error("Error trying to retrieve the list of users ");
        }
        console.log(users);
        res.end("users");
        client.close();
      });
    },
    { useNewUrlParser: true }
  );
};
