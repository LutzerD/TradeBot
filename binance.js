const axios = require("axios");

const basePath = "https://api.binance.com/api/v3";

const apiPaths = {
  time: "/time",
  historical: "/historicalTrades",
  depth: "/depth",
};

const loadApiKey = function () {
  const filePath = "secret.config";

  try {
    const { apiKey } = require(`./${filePath}`);
    this.apiKey = apiKey;
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

const depth = (symbol, limit) => {
  /*
  symbol	STRING	YES	
  limit	  INT	    NO	  Default 500; max 1000.
  */
  let path = `${basePath}${apiPaths.depth}`;
  return axios.get(path, { params: { symbol: symbol, limit: limit } });
};

const time = function () {
  /*
  symbol	STRING	YES	
  limit	  INT	    NO	  Default 500; max 1000.
  */
  let path = `${basePath}${apiPaths.time}`;
  console.log("gettin", path);
  return axios.get(path);
};

const historical = function (symbol, limit, fromId) {
  /*
  symbol	STRING	YES	
  limit	  INT	    NO	  Default 500; max 1000.
  fromId	LONG	  NO	  TradeId to fetch from. Default gets most recent trades.
 */
  let path = `${basePath}${apiPaths.historical}`;

  const options = {
    params: {
      symbol: symbol,
      limit: limit,
      fromId: fromId,
    },
    headers: {
      "X-MBX-APIKEY": this.apiKey,
    },
  };

  return axios.get(path, options);
};

const exchange = {
  depth: depth,
  historical: historical,
  setup: loadApiKey,
  time: time,
};

exchange.setup();
exports.exchange = exchange;
