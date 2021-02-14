const https = require("https");

const query = (queries) => {
  output = "";
  for (const [key, value] of Object.entries(queries)) {
    if (value === undefined) continue;
    if (output === "") {
      output += "?";
    } else {
      output += "&";
    }
    output += `${key}=${value}`;
  }
  return output;
};

const formatRes = (res) => {
  res.setEncoding("utf8");
};

const get = (options) => {
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

exports.get = get;
exports.query = query;
