const express = require('express');
const {handleQuestion } = require('../controllers/askAi.js');

const router = express.Router();

router.post('/',handleQuestion);
module.exports = router;