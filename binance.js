const basePath = "/api/v3";
const options = (path) => {
  return {
    hostname: "api.binance.com",
    port: 443,
    path: basePath + path,
  };
};

const apiPaths = {
  time: "/time",
};

const data = (symbol, limit) => {
  let path = "/depth";
  path += `?symbol=${symbol}`;
  if (limit) {
    path += `&limit=${limit}`;
  }
  return path;
};

exports.options = options;
exports.time = "/time";
exports.data = data;
