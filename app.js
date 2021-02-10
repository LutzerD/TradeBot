const http = require("http");

/*
Alternatives
api1.binance.com
api2.binance.com
api3.binance.com
*/

/* 
  Data returned ascending first
  Timestamps in ms  
*/
const https = require("https");
const basePath = "/api/v3";

const baseOptions = {
  hostname: "api.binance.com",
  port: 443,
  path: basePath + "/ping",
};

const formatRes = (res) => {
  res.setEncoding("utf8");
};

const get = (endpoint) => {
  let options = baseOptions;
  options.method = "GET";

  const req = https.request(options, (res) => {
    formatRes(res);
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      console.log("got:", d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};

get("/ping");
