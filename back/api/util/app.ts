import * as express from "express";
import commonMiddlewares from "../middlewares/common";

const createApp = () => {
  const app = express();
  app.set("trust proxy", 1);
  app.use(...commonMiddlewares);
  return app;
};

export default createApp;
