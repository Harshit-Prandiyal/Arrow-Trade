import axios from 'axios';

const url = 'http://192.168.39.155:8000/api/getStockDetails';
export function fetchChartData(id){

    return axios.post(url, { id: id })
    .then((response) => {
        console.log("Chart Data request successfully sent!");
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
    });
}