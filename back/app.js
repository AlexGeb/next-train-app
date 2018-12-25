const express = require("express");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const api = express();

api.get("/", (req, res) => {
  console.log(api.mountpath); // /api
  res.send(
    "<h1><marquee direction=right>Hello from Express path / on Now 2.0!</marquee></h1>"
  );
  res.end();
});

api.get("/about", (req, res) => {
  res.send(
    "<h1><marquee direction=left>Hello from Express path /about on Now 2.0!</marquee></h1>"
  );
  res.end();
});

app.use("/api", api); // mount the sub app
app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
