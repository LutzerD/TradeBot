const express = require("express");
const app = express();
var { URL } = require("url");
var { apiHandler } = require("./apiHandler");

var config = {
  port: 8080,
  url: "http://localhost:8080",
};

app.get("/api", (req, res, next) => {
  apiHandler(req, res, next);
});

app.listen(config.port, () => {
  console.log(`Start on port ${config.port}?`);
  return;
});
