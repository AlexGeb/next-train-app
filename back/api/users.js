const { parse } = require("url");
const { getDb } = require("../db");

const getUsers = (req, res) => {
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

const postUser = (req, res) => {
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

module.exports = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    // case "DELETE":
    //   deleteUser(req, res);
    //   break;
    default:
      req.end();
      break;
  }
};
