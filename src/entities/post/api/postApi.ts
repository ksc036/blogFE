import axiosInstance from "@/shared/lib/axiosInstance";

export const createPostApi = async (
  title: string,
  content: string,
  thumbnailUrl: string,
  desc: string,
  visibility: boolean,
  postUrl: string,
  tags?: string[]
) => {
  const res = await axiosInstance.post(`/posts`, {
    title,
    content,
    thumbnailUrl,
    desc,
    visibility,
    postUrl,
    ...(tags ? { tags } : {}),
  });
  return res.data;
};

export const updatePostApi = async (
  title: string,
  content: string,
  thumbnailUrl: string,
  desc: string,
  visibility: boolean,
  postUrl: string,
  postId: number,
  tags?: string[]
) => {
  const res = await axiosInstance.put(`/posts/${postId}`, {
    title,
    content,
    thumbnailUrl,
    desc,
    visibility,
    postUrl,
    ...(tags ? { tags } : {}),
  });
  return res.data;
};
