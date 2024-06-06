const mongoose = require("mongoose");
// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    balance: { type: Number, default: 10000 },
    portfolio: { type: Array, default: [] },
    watchlist: { type: Array, default: [] },
    totalGain: {type: Number , default: 0},
    totalLoss: {type: Number , default: 0}
});
const User = mongoose.model("User", userSchema);
module.exports = User;