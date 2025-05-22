// shared/lib/axiosInstanceServer.ts
import axios from "axios";

// 요청 범위 안에서만 호출되도록 유틸 함수로 정의
export function createServerAxios(cookie: string) {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
      Cookie: cookie,
    },
  });
}
