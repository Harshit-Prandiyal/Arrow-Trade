const coins = require('../models/coinList');
async function handleCoinList(req, res) {
    return res.json(coins);
}
module.exports={handleCoinList };