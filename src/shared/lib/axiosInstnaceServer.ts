// lib/axiosInstance.js
import axios from "axios";
import { cookies } from "next/headers";

const cookieStore = cookies();
const cookie = cookieStore.toString(); // 쿠키 문자열로 변환
const axiosInstance = axios.create({
  // baseURL: "http://localhost:2999", // 공통 base URL
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 공통 base URL1
  timeout: 5000,
  withCredentials: true,
  headers: {
    Cookie: cookie,
  },
});

export default axiosInstance;
