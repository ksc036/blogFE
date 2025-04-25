import axiosInstance from "@/shared/lib/axiosInstance";
import { Comment } from "@/entities/comment/model/types"; // 필요시

export async function postComment(postId: number, content: string) {
  const res = await axiosInstance.post<Comment>("/comments", {
    postId,
    content,
  });
  return res.data;
}

export async function postSubComment(
  postId: number,
  content: string,
  parentId: number
) {
  const res = await axiosInstance.post<Comment>("/comments", {
    postId,
    content,
    parentId,
  });
  return res.data;
}
