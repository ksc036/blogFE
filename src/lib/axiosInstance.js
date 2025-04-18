// lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL, // 공통 base URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
