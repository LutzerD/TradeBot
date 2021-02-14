const { exchange } = require("./binance.js");
console.log("butts", exchange);

const historical = exchange.historical("BTCUSDT");
historical.then(function (response) {
  console.log("Resp:", response);
  data = response.data;
  console.log(data);
});

historical.catch(function (error) {
  console.log("error:", error);
});
