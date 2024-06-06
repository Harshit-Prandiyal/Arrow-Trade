import axios from 'axios';
const url = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/listCoins`;
export function fetchCoinList(){
    return axios.get(url)
    .then((response) => {
        console.log("coins list request successfully sent!");
        // console.log(response.data);
        return response.data;
    })
    .catch((error) => {
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
        throw error;  // Re-throw the error to be handled by the caller
    });
}