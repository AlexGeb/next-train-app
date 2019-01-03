const { parse } = require("url");
const { getDb } = require("../db");

module.exports = (req, res) => {
  const { query } = parse(req.url, true);
  const { name } = query;
  getDb(db => {
    const mongodbQuery = name ? { name } : {};
    db.collection("users")
      .find(mongodbQuery)
      .toArray((err, users) => {
        if (err) throw err;
        res.end(JSON.stringify(users));
      });
  });
};
