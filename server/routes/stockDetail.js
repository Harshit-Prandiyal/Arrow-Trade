const express = require('express');
const {handleGetStockDetail  } = require('../controllers/stockDetail');

const router = express.Router();

router.post('/',handleGetStockDetail);
module.exports = router;