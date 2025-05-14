import axiosInstance from "@/shared/lib/axiosInstance";
import { cookies } from "next/headers";
export async function getPostsBySubdomainWithId(subdomian: string, id: number) {
  // const token = cookieStore.get("token")?.value;
  const cookieStore = await cookies();
  const cookieHeader = cookies().toString(); // "token=...; other=value"
  console.log("token,", cookieHeader);
  const res = await axiosInstance.get(`/posts/${subdomian}/${id}`, {
    headers: {
      Cookie: cookieHeader, // ✅ key=value 형식으로 명시
    },
  });
  return res.data;
}
