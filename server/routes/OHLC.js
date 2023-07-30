const express = require('express');
const { handleOHLC } = require('../controllers/OHLC');

const router = express.Router();

router.post('/',handleOHLC);
module.exports = router;