const express = require('express');
const { handleCoinList } = require('../controllers/coinList');

const router = express.Router();

router.get('/',handleCoinList);
module.exports = router;