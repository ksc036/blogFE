// lib/axiosInstance.js
import axios from "axios";
import https from "https"; //
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 공통 base URL
  timeout: 5000,
  httpsAgent: agent,
});

export default axiosInstance;
