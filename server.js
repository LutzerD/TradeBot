const express = require("express");
const app = express();
var { URL } = require("url");
var { historicalData } = require("./apiHandler");
const cors = require("cors");

app.use(cors());

var config = {
  port: 8080,
  url: "http://localhost:8080",
  base: "/api",
};

app.get(config.base + "/historicalData", (req, res, next) => {
  historicalData(req, res, next);
});

app.listen(config.port, () => {
  console.log(`Start on port ${config.port}?`);
  return;
});
