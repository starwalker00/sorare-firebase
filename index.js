var sorareService = require("./sorareService.js");
var firebaseService = require("./firebaseService.js");

const dataFetchIntervalInMs = 1 * 2 * 1000;;
const auctionNumberPerCall = 2;

setInterval(() => {


    const now = new Date();
    console.log(now.toLocaleString());
    sorareService.callToSorareApi(auctionNumberPerCall)
        .then((data) => {

            let currentPriceETH = parseFloat(data.transferMarket.englishAuctions.nodes[0].currentPrice) * 1e-18;
            let cardName = data.transferMarket.englishAuctions.nodes[0].cards[0].name;
            console.log(currentPriceETH);
            console.log(cardName);
            let message = {
                notification: {
                    title: cardName,
                    body: currentPriceETH.toString().substring(0, 5).concat(' ETH')
                }
            };
            console.log(JSON.stringify(message, undefined, 2))
            firebaseService.sendToDevice(message);
        }
        )
        .catch((error) => console.error(error));


}, dataFetchIntervalInMs)
