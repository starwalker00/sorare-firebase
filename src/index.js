var sorareService = require("./sorareService.js");
var firebaseService = require("./firebaseService.js");
var rateService = require("./rateService.js");

const dataFetchIntervalInMs = 1 * 2 * 1000;;
const auctionNumberPerCall = 2;

// get ETHUSD rate
var rateETHUSD;
(async function () {
    rateETHUSD = await rateService.getRateETHUSD();
}());

setInterval(() => {

    const now = new Date();
    console.log(now.toLocaleString());
    sorareService.callToSorareApi(auctionNumberPerCall)
        .then((data) => {

            let priceString;
            let currentPriceETH = parseFloat(data.transferMarket.englishAuctions.nodes[0].currentPrice) * 1e-18;
            let cardName = data.transferMarket.englishAuctions.nodes[0].cards[0].name;
            // console.log(currentPriceETH);
            // console.log(cardName);
            // console.log(rateETHUSD);
            if (rateETHUSD) {
                let currentPriceUSD = currentPriceETH * rateETHUSD;
                let priceETH = currentPriceETH.toString().substring(0, 6).concat(' ETH');
                let priceUSD = currentPriceUSD.toFixed(2).toString().concat(' USD');
                priceString = priceETH.concat(' - ').concat(priceUSD);
            }
            else {
                let priceETH = currentPriceETH.toString().substring(0, 6).concat(' ETH');
                priceString = priceETH
            }

            let message = {
                notification: {
                    title: cardName,
                    body: priceString
                }
            };
            console.log(JSON.stringify(message, undefined, 2))
            // {
            //     "notification": {
            //       "title": "Cade Cowell 2021-22 • Limited 209/1000",
            //       "body": "0.0123 ETH"
            //     }
            //   }
            firebaseService.sendToDevice(message);
        }
        )
        .catch((error) => console.error(error));


}, dataFetchIntervalInMs)
