// api/blog.js
import axios from "@/lib/axiosInstance";

export async function getUsers() {
  const res = await axios.get("/users"); // GET
  return res.data; // 블로그 리스트 반환
}
