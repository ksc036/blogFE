import axiosInstance from "@/shared/lib/axiosInstance";
import { Comment } from "@/entities/comment/types";
export async function putCommentApi(
  commentId: number,
  postId: number,
  editContent: string
) {
  const res = await axiosInstance.put(`/comments`, {
    id: commentId,
    postId: postId,
    content: editContent,
  });
  return res.data;
}
export async function deleteCommentApi(commentId: number) {
  const res = await axiosInstance.delete(`/comments`, {
    data: {
      id: commentId,
    },
  });
  return res.data;
}

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
