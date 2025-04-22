// lib/axiosInstance.js
import axios from "axios";
const agent = new https.Agent({
  rejectUnauthorized: false, // 인증서 CN 불일치 또는 self-signed 대응 (로컬 테스트만)
});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 공통 base URL
  timeout: 5000,
  httpsAgent: agent,
});

export default axiosInstance;
