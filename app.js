const http = require("http");

const loadApiKey = () => {
  const filePath = "secret.config";
  try {
    const { apiKey } = require(`./${filePath}`);
  } catch (error) {
    if (error.code == "MODULE_NOT_FOUND" || !apiKey) {
      const errorMsg = `Please create an api key file named ${filePath}.\nYou may use example_${filePath} as a reference.`;

      console.error(errorMsg);
    } else {
      console.error(error);
    }
    process.exit();
  }
};

loadApiKey();
var api = require("./binance.js");

const https = require("https");

const formatRes = (res) => {
  res.setEncoding("utf8");
};

const get = (endpoint) => {
  let options = api.options(endpoint);
  options.method = "GET";
  console.log(`${options.method}:${options.hostname}${options.path}`);

  const req = https.request(options, (res) => {
    formatRes(res);
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      console.log("Data:", d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};

// get(api.time);
get(api.data("BTCUSDT", 10));
