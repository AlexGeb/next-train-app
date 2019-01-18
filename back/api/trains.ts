import createApp from "./util/app";
import { getPossibleItems, getNextDepartures } from "./services/sncf";
import { Request, Response } from "express";

const searchStation = async (req: Request, res: Response) => {
  const { q, stopAreaId } = req.query;
  if (typeof q === "string") {
    try {
      const searchResults = await getPossibleItems(q);
      res.json(searchResults);
      return;
    } catch (error) {
      res.statusCode = 400;
      res.json(error);
      return;
    }
  } else if (typeof stopAreaId === "string") {
    try {
      const departures = await getNextDepartures(stopAreaId);
      res.json(departures);
    } catch (error) {
      res.statusCode = 400;
      res.json(error);
      return;
    }
  } else {
    res.statusCode = 400;
    res.json({ error: "No query or stop area id specified" });
    return;
  }
};

const app = createApp();
app.get("*", (req, res) => {
  searchStation(req, res);
});

module.exports = app;
