import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/pastPriceData`;

const fetchPastPrices = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new Error("Input should be an array of IDs");
  }

  try {
    const responses = await Promise.all(ids.map(id => axios.post(url, { id })));

    const results = responses.map(response => {
      if (response.data.error) {
        throw new Error(`Error fetching data for ID ${response.config.data.id}: ${response.data.error}`);
      }
      return response.data;
    });

    return results;
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
};

export { fetchPastPrices };
