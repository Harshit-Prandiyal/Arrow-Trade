import axios from 'axios';
//const { userId, portfolio } = req.body;
const pushPortfolio = async ({userId , portfolio , current_balance, totalGain, totalLoss}) => {
    const url = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/user/addToPortfolio`;
    try {
        const response = await axios.post(url, {userId , portfolio , current_balance, totalGain, totalLoss});
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("Response Data:", error.response.data);
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
        } else if (error.request) {
            console.log("Request made, but no response received.");
            console.log("Request:", error.request);
        } else {
            console.log("Error occurred during the request setup:", error.message);
        }
    }
}
//const { userId, watchlist } = req.body;
const pushWatchlist = async ({userId , watchlist}) => {
    const url = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/user/addToWatchlist`;
    try {
        const response = await axios.post(url, {userId , watchlist});
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("Response Data:", error.response.data);
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
        } else if (error.request) {
            console.log("Request made, but no response received.");
            console.log("Request:", error.request);
        } else {
            console.log("Error occurred during the request setup:", error.message);
        }
    }
}
export { pushPortfolio, pushWatchlist };