import axiosInstance from "@/shared/lib/axiosInstance";
import { Post } from "@/entities/post/model/types";

export async function getPosts(): Promise<Post[]> {
  const res = await axiosInstance.get(`/posts`);
  return res.data;
}
