const axios = require('axios');

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

function createConvertedDataObj(data) {
  const relevantFields = data.map((item) => {
    return {
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      image: item.image,
      current_price: item.current_price,
      price_change_percentage_24h: item.price_change_percentage_24h,
    };
  });
  return relevantFields;
}
async function handleCoinList(req, res) {
  axios
    .get(url)
    .then((data) => {
      const returndata = createConvertedDataObj(data.data);
      return res.json(returndata);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
      return res.json({ error: "Coin List api gave an error" });
    });
}
module.exports = { handleCoinList };
