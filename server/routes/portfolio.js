const express = require('express');
const {handleGetPortfolio  } = require('../controllers/portfolio');

const router = express.Router();

router.post('/',handleGetPortfolio);
module.exports = router;