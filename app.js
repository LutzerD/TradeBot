const { exchange } = require("./binance.js");
const { plot, Plot } = require("nodeplotlib");

// const time = exchange.time().then((resp) => console.log(resp.data));
const historical = exchange.historical("BTCUSDT");
historical.then(function (response) {
  console.log("Resp:", response);
  response = response.data;
  const timeline = response.map((datum) => new Date(datum.time));
  const data = [
    // {
    //   x: response.map((datum) => datum.quoteQty),
    //   y: timeline,
    //   type: "line",
    // },
    {
      y: response.map((datum) => datum.price),
      x: timeline,
      type: "line",
    },
  ];
  plot(data);
});

historical.catch(function (error) {
  console.log("error:", error);
});
