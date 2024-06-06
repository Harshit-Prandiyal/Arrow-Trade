const express = require("express");
const {
  handleAddToPortfolio,
  handleAddToWatchlist,
} = require("../controllers/user");

const router = express.Router();
router.post("/addToPortfolio", handleAddToPortfolio);
router.post("/addToWatchlist", handleAddToWatchlist);
module.exports = router;
