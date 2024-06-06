const User = require("../models/user");
async function handleAddToPortfolio(req, res) {
  const { userId, portfolio, current_balance, totalGain, totalLoss } = req.body;
  console.log(req.body, "update portfolio api call initiated");
  console.log(totalLoss,totalGain);
  if (!userId || !portfolio || !current_balance ) {
    return res.status(400).json({ error: "Provide all the fields" });
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ error: "Invalid user id provided" });
  }
  user.portfolio = portfolio;
  user.balance = current_balance;
  user.totalGain = totalGain;
  user.totalLoss = totalLoss;
  await user.save();
  return res.status(200).json({ message: "Portfolio updated successfully" , user });
}
async function handleAddToWatchlist(req, res) {
    const { userId, watchlist } = req.body;
    console.log(req.body, "server login");
    if (!userId || !watchlist) {
        return res.status(400).json({ error: "Provide all the fields" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(400).json({ error: "Invalid user id provided" });
    }
    user.watchlist = watchlist;
    await user.save();
    return res.status(200).json({ message: "Watchlist updated successfully" , user });
}
module.exports = { handleAddToPortfolio, handleAddToWatchlist };
