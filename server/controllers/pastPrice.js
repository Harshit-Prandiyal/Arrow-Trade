const axios = require("axios");
const dayjs = require('dayjs');

const urlStart = 'https://api.coingecko.com/api/v3/coins/';
const urlEnd = '/market_chart?vs_currency=usd&days=7&interval=daily&precision=1';

function generateUrl(id){
    const url = urlStart+id+urlEnd;
    return url;
}
function createConvertedDataArray(data){
    data.pop();
  // Convert the rest to an array of objects with time and price
  const result = data.map(([timestamp, price]) => {
    const day = dayjs(timestamp).format('ddd');
    return {
      x: day.charAt(0).toUpperCase() + day.slice(1), 
      y: price
    };
  });
  return result;
}
async function handlePastPrice(req, res) {
  const id = req.body.id;
  console.log(id);
  if (!id) {
    return res.json({ error: "provide a body with stock id" });
  }
  const url = generateUrl(id);
  
  axios
    .get(url)
    .then((data) => {
      const returndata = createConvertedDataArray(data.data.prices);
      return res.json(returndata);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
      return res.json({ error: "Past prices api gave an error" });
    });
}
module.exports = { handlePastPrice };
