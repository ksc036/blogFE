// lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 공통 base URL1
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
