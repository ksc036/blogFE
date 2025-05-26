import axiosInstance from "@/shared/lib/axiosInstance";
import { PostWithPageNation } from "@/entities/post/types";

export async function getPosts(page: number = 1): Promise<PostWithPageNation> {
  const res = await axiosInstance.get(`/posts`, {
    params: {
      page: page,
    },
  });
  return res.data;
}

export async function getPostsByIdClient(id: number) {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
}

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
