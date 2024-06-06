import axios from 'axios';

const logUserIn = async (email, password) => {
    const url = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/auth/login`;
    try {
        console.log('making login request');
        const response = await axios.post(url, { email : email, password: password });
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
        throw error;  // Re-throw the error to be handled by the caller
    }
}
const registerUser = async ({name, email, password}) => {
    const url = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/auth/register`;
    try {
        const response = await axios.post(url, { name, email, password });
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
        return {isAuthenticated: false} ;
    }
}
export { logUserIn , registerUser};