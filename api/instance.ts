import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 1000,
  headers: {
    x_cg_api_key: process.env.COINGECKO_KEY!,
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default instance;
