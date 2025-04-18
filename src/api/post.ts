// api/blog.js
import axios from "@/lib/axiosInstance";

export async function getPosts() {
  const res = await axios.get("/posts"); // GET /blogs 요청
  return res.data; // 블로그 리스트 반환
}
