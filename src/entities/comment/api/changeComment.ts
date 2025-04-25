import axiosInstance from "@/shared/lib/axiosInstance";

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
