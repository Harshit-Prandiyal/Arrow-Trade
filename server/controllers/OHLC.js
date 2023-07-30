const axios = require('axios');
// function createConvertedDataObj(data){
//       const open = data[0][1];
//       const close = data[data.length - 1][4];
//       let high = data[0][2];
//       let low = data[0][3];
  
//       for (let j = 1; j < data.length; j++) {
//         const [t,o, dayHigh, dayLow,c] = data[j];
  
//         if (dayHigh > high) {
//           high = dayHigh;
//         }
  
//         if (dayLow < low) {
//           low = dayLow;
//         }
//       }
  
//       // Create the single entry for the day
//       const entry = {
//         open,
//         high,
//         low,
//         close,
//       };
//       return entry;
// }
function createConvertedDataObj(data){
  const entry = {
    name: data.name,
    symbol: data.symbol,
    image : data.image.small,
    market_cap : data.market_data.market_cap.usd,
    volume : data.market_data.total_volume.usd,
    high : data.market_data.high_24h.usd,
    low : data.market_data.low_24h.usd,
    price_change_percentage_24h : data.market_data.price_change_percentage_24h,
  }
  return entry;
}
const urlStart = 'https://api.coingecko.com/api/v3/coins/';
const urlEnd='?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false';
function generateUrl(id){
    const url = urlStart + id + urlEnd;
    return url;
  }
async function handleOHLC(req, res) {
    const id = req.body.id;
    if(!id){
        return res.json({ error: 'provide a body with stock id' });
    }
    const url = generateUrl(id);
    axios.get(url)
        .then(data => {
            const returndata = createConvertedDataObj(data.data);
            return res.json(returndata);
        })
        .catch(err => {
            console.log('Error: ', err.message);
            return res.json({ error: 'OHLC Detail api gave an error' });
        });
    
  }

  module.exports={handleOHLC };