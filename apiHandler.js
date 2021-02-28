const { exchange } = require("./binance.js");

exports.historicalData = historicalData;

function historicalData(req, res, next, q) {
  console.log("Got:", req);
  const symbol = req.query.symbol || "BTCUSDT";
  const historical = exchange.historical(symbol);
  historical.then(function (response) {
    response = response.data;
    const timeline = response.map((datum) => new Date(datum.time));
    const data = [
      {
        y: response.map((datum) => datum.price),
        x: timeline,
      },
    ];
    res.json(data); //todo: support metadata, like e.g. send symbol, exchange/source, etc.
  });

  historical.catch(function (error) {
    console.log("error:", error);
    res.sendStatus(500, error);
  });
}
