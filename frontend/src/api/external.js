import axios from "axios"; // Import axios for making HTTP requests

// Define the endpoint for fetching news articles
const NEWS_API_ENDPOINT =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"; // News API endpoint for business news

// Define the endpoint for fetching cryptocurrency data
const CRYPTO_API_ENDPOINT =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"; // CoinGecko API endpoint for cryptocurrency market data

// Function to get news articles
export const getNews = async () => {
  let response; // Variable to store the response from the API

  try {
    response = await axios.get(NEWS_API_ENDPOINT); // Make a GET request to the news API endpoint
    response = response.data.articles.slice(0, 15); // Extract the first 15 articles from the response
  } catch (error) {
    // Handle error (currently does nothing)
  }

  return response; // Return the response containing the articles
};

// Function to get cryptocurrency data
export const getCrypto = async () => {
  let response; // Variable to store the response from the API

  try {
    response = await axios.get(CRYPTO_API_ENDPOINT); // Make a GET request to the cryptocurrency API endpoint
    response = response.data; // Store the data from the response
  } catch (error) {
    // Handle error (currently does nothing)
  }

  return response; // Return the response containing the cryptocurrency data
};