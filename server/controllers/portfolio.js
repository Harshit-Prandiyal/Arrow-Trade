const axios = require('axios');
const urlStart = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=';
const urlEnd = '&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&precision=2';
function generateUrl(body){
    let ids='';
    for(const i in body){
        if(i==0){
            ids+=body[i].id;
        }else{
            ids+='%2C'+body[i].id;
        }
    }
    const url = urlStart + ids + urlEnd;
    return url;
}
async function handleGetPortfolio(req, res) {
    const tickers = req.body.tickers;
    if(!tickers){
        return res.json({ error: 'provide a body with stock ids' });
    }
    console.log(tickers);
    const url = generateUrl(tickers);
    axios.get(url)
        .then(data => {
            const fetchdata = data.data;
            let returndata = [];
            for (const i in fetchdata) {
                const ticker = fetchdata[i];
                const tickerData = {
                    id: ticker.id,
                    symbol: ticker.symbol,
                    name: ticker.name,
                    image: ticker.image,
                    current_price: ticker.current_price,
                    price_change_percentage_24h: ticker.price_change_percentage_24h,
                }
                returndata.push(tickerData);
            }
            return res.json(returndata);
        })
        .catch(err => {
            console.log('Error: ', err.message);
            return res.json({ error: 'Basic Stock api gave an error' });
        });
}
module.exports={handleGetPortfolio };
// [
//     {
//         "id": "bitcoin",
//         "symbol": "btc",
//         "name": "Bitcoin",
//         "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//         "current_price": 29932.89,
//         "market_cap": 582055057088,
//         "market_cap_rank": 1,
//         "fully_diluted_valuation": 628967431597,
//         "total_volume": 12239229718,
//         "high_24h": 30176,
//         "low_24h": 29720,
//         "price_change_24h": 148.43,
//         "price_change_percentage_24h": 0.49836,
//         "market_cap_change_24h": 2107188549,
//         "market_cap_change_percentage_24h": 0.36334,
//         "circulating_supply": 19433687,
//         "total_supply": 21000000,
//         "max_supply": 21000000,
//         "ath": 69045,
//         "ath_change_percentage": -56.62114,
//         "ath_date": "2021-11-10T14:24:11.849Z",
//         "atl": 67.81,
//         "atl_change_percentage": 44069.41253,
//         "atl_date": "2013-07-06T00:00:00.000Z",
//         "roi": null,
//         "last_updated": "2023-07-19T12:45:40.751Z"
//     }
// ]