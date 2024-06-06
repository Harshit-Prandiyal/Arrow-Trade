const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const basicRoute = require("./routes/portfolio");
const cors = require('cors')
const detailRoute = require("./routes/stockDetail");
const OHLCRoute = require("./routes/OHLC");
const coinListRoute = require("./routes/coinList");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const pastPriceRoute = require("./routes/pastPrice");
const aiRoute = require("./routes/askAi");
require('dotenv').config()

mongoose.connect(
  process.env.DB_CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true , dbName: "ArrowTrade"}
).then(() => {
    console.log("MongoDb connected");
}).catch((err) => {
    console.log("MongoDb Error",err);
});


app.use(cors());
app.use(express.json());
app.use("/api/getUserData", basicRoute);
app.use("/api/getStockDetails", detailRoute);
app.use("/api/getOHLC", OHLCRoute);
app.use("/api/listCoins", coinListRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/pastPriceData",pastPriceRoute);
app.use("/api/askAi",aiRoute);
app.listen(PORT, () => {
  console.log("server started");
});
