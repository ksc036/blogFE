import axiosInstance from "@/shared/lib/axiosInstance";
export async function getPostsById(id: number) {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
}
