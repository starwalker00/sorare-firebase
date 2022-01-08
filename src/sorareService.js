let { request, gql } = require('graphql-request');

async function callToSorareApi(num) {
    const endpoint = 'https://api.sorare.com/graphql'
    const query = gql`
    query ListSoonEndingEnglishAuctions {
      transferMarket {
        englishAuctions(first: ${num.toString()}) {
          nodes {
            slug
            currentPrice
            startDate
            endDate
            cards {
              slug
              player{
                age
              }
              name
              rarity
              priceRange{
                min
                max
              }
            }
          }
        }
      }
    }
    `
    const data = await request(endpoint, query)
    return data;
    // console.log(JSON.stringify(data, undefined, 2))
}

module.exports.callToSorareApi = callToSorareApi;