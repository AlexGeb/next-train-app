import { parse } from "url";
import * as http from "http";
import { getPossibleItems, getNextDepartures } from "./services/sncf";

const searchStation = async (req, res) => {
  const { query } = parse(req.url, true);
  const { q, stopAreaId } = query;
  if (typeof q === "string") {
    try {
      const searchResults = await getPossibleItems(q);
      res.end(JSON.stringify(searchResults));
      return;
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
      return;
    }
  } else if (typeof stopAreaId === "string") {
    try {
      const departures = await getNextDepartures(stopAreaId);
      res.end(JSON.stringify(departures));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
      return;
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "No query or stop area id specified" }));
    return;
  }
};

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { method } = req;
  switch (method) {
    case "GET":
      searchStation(req, res);
      break;
    default:
      res.statusCode = 405;
      res.end();
      break;
  }
};
