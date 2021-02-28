const { exchange } = require("./binance.js");

exports.apiHandler = apiHandler;

function apiHandler(req, res, q) {
  const historical = exchange.historical("BTCUSDT");
  historical.then(function (response) {
    console.log("Resp:", response);
    response = response.data;
    const timeline = response.map((datum) => new Date(datum.time));
    const data = [
      {
        y: response.map((datum) => datum.price),
        x: timeline,
      },
    ];
    res.json(data);
  });

  historical.catch(function (error) {
    console.log("error:", error);
    res.sendStatus(500, error);
  });
}
