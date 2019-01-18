import { ObjectID, DeleteWriteOpResultObject } from "mongodb";
import { getDb } from "./util/db";
import createApp from "./util/app";
import { Response, Request } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const mongodbQuery =
      typeof _id === "string" ? { _id: new ObjectID(_id) } : {};
    const db = await getDb();
    const users = await db
      .collection("users")
      .find(mongodbQuery)
      .toArray();
    res.json(users);
  } catch (error) {
    res.statusCode = 400;
    res.json({ error });
  }
};

const postUsers = async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const insertResult = await db.collection("users").insertMany(req.body);
    res.json(insertResult.insertedIds);
  } catch (error) {
    res.statusCode = 400;
    res.json(error);
  }
};

const deleteUsers = async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const { _id } = req.query;
    let deleteResult: DeleteWriteOpResultObject;
    if (typeof _id === "string") {
      deleteResult = await db
        .collection("users")
        .deleteOne({ _id: new ObjectID(_id) });
    } else {
      deleteResult = await db.collection("users").deleteMany({});
    }
    res.json(deleteResult);
  } catch (error) {
    res.statusCode = 400;
    res.json(error);
  }
};

const app = createApp();
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
