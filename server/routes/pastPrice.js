const express = require('express');
const { handlePastPrice } = require('../controllers/pastPrice');

const router = express.Router();

router.post('/',handlePastPrice);
module.exports = router;