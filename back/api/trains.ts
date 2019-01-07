import { parse } from "url";
import * as http from "http";
import { getPossibleItems, IResult } from "./services/sncf";

interface ISearchResult {
  name: string;
  externalCode: string;
}

const searchStation = async (req, res) => {
  const { query } = parse(req.url, true);
  const { q } = query;
  let searchResults: IResult[] = [];
  if (typeof q === "string") {
    searchResults = await getPossibleItems(q);
  }
  const searchResultsForFront: ISearchResult[] = searchResults.map(result => ({
    name: result.name,
    externalCode: result.codes.find(code => code.type === "external_code").value
  }));

  res.end(JSON.stringify(searchResultsForFront));
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
