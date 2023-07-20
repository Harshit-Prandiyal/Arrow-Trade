const axios = require('axios');

const API_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7';
const urlStart =  'https://api.coingecko.com/api/v3/coins/';
const urlEnd = '/ohlc?vs_currency=usd&days=7';
function createConvertedDataArray(data) {
    // Remove the first entry from the data array
    data.shift();
    const candlesticksPerDay = 6;
    const numDays = Math.ceil(data.length / candlesticksPerDay);
  
    const converted_data_array = [];
  
    for (let i = 0; i < numDays; i++) {
      const startIndex = i * candlesticksPerDay;
      const endIndex = startIndex + candlesticksPerDay;
  
      const dayCandlesticks = data.slice(startIndex, endIndex);
  
      // Extract the timestamp from the first candlestick of the day and convert it to a date
      const timestamp = dayCandlesticks[0][0];
      const date = new Date(timestamp).toDateString();
  
      // Get the open value from the first candlestick
      const open = dayCandlesticks[0][1];
  
      // Get the close value from the last candlestick
      const close = dayCandlesticks[dayCandlesticks.length - 1][4];
  
      // Calculate the highest high and lowest low for the day
      let high = dayCandlesticks[0][2];
      let low = dayCandlesticks[0][3];
  
      for (let j = 1; j < dayCandlesticks.length; j++) {
        const [t,o, dayHigh, dayLow,c] = dayCandlesticks[j];
  
        if (dayHigh > high) {
          high = dayHigh;
        }
  
        if (dayLow < low) {
          low = dayLow;
        }
      }
  
      // Create the single entry for the day
      const entry = {
        date,
        open,
        high,
        low,
        close,
      };
  
      converted_data_array.push(entry);
    }
  
    return converted_data_array;
  }
  function generateUrl(id){
    const url = urlStart + id + urlEnd;
    return url;
  }
  async function handleGetStockDetail(req, res) {
    const id = req.body.id;
    if(!id){
        return res.json({ error: 'provide a body with stock id' });
    }
    const url = generateUrl(id);
    axios.get(url)
        .then(data => {
            const returndata = createConvertedDataArray(data.data);
            return res.json(returndata);
        })
        .catch(err => {
            console.log('Error: ', err.message);
            return res.json({ error: 'Stock Detail api gave an error' });
        });
    
  }
module.exports={handleGetStockDetail };