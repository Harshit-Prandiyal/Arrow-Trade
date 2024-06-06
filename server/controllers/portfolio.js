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