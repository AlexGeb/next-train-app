const { parse } = require("url");
const { getDb } = require("../db");
const { getJsonBody } = require("../requestHelper");

const getUsers = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    const { name } = query;
    const mongodbQuery = name ? { name } : {};
    const db = await getDb();
    const users = await db
      .collection("users")
      .find(mongodbQuery)
      .toArray();
    res.end(JSON.stringify(users));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify(error));
  }
};

const postUsers = async (req, res) => {
  try {
    const body = await getJsonBody(req);
    const db = await getDb();
    const insertResult = await db.collection("users").insertMany(body);
    res.end(JSON.stringify(insertResult));
  } catch (error) {
    console.error(error);
    res.statusCode = 400;
    res.end(JSON.stringify(error));
  }
};

const deleteUsers = async (req, res) => {
  try {
    const db = await getDb();
    const deleteResult = await db.collection("users").deleteMany();
    res.end(JSON.stringify(deleteResult));
  } catch (error) {
    console.error(error);
    res.statusCode = 400;
    res.end(JSON.stringify(error));
  }
};

module.exports = (req, res) => {
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
