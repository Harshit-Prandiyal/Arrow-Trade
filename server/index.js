const express = require('express');
const app = express();
const PORT = 8000;
const basicRoute = require('./routes/portfolio');
const detailRoute = require('./routes/stockDetail');

app.use(express.json());
app.use('/api/getUserData',basicRoute);
app.use('/api/getStockDetails',detailRoute);

app.listen(PORT,()=>{console.log('server started');})