const express = require('express');
const app = express();
const PORT = 8000;
const basicRoute = require('./routes/portfolio');
const detailRoute = require('./routes/stockDetail');
const OHLCRoute = require('./routes/OHLC');
const coinListRoute = require('./routes/coinList');

app.use(express.json());
app.use('/api/getUserData',basicRoute);
app.use('/api/getStockDetails',detailRoute);
app.use('/api/getOHLC',OHLCRoute);
app.use('/api/listCoins',coinListRoute);
app.listen(PORT,()=>{console.log('server started');})