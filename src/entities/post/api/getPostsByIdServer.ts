import axiosInstance from "@/shared/lib/axiosInstance";
import { cookies } from "next/headers";
export async function getPostsById(id: number) {
  const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  const cookieHeader = cookies().toString(); // "token=...; other=value"
  console.log("token,", cookieHeader);
  const res = await axiosInstance.get(`/posts/${id}`, {
    headers: {
      Cookie: cookieHeader, // ✅ key=value 형식으로 명시
    },
  });
  return res.data;
}
