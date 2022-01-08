let axios = require('axios');

async function getRateETHUSD() {
  return axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
    .then(response => {
      console.log(JSON.stringify(response.data, undefined, 2));
      console.log(response.data.USD)
      return response.data.USD;
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports.getRateETHUSD = getRateETHUSD;