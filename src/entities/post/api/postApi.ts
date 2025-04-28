import axiosInstance from "@/shared/lib/axiosInstance";
import { Post } from "../model/types";

export const getPostsBySubdomain = async (
  subdomain: string
): Promise<Post[]> => {
  const res = await axiosInstance.get(`/posts/subdomain/${subdomain}`);
  return res.data;
};

export const createPostApi = async (
  title: string,
  content: string,
  thumbnailUrl: string,
  desc: string,
  visibility: boolean,
  postUrl: string
) => {
  const res = await axiosInstance.post(`/posts`, {
    title,
    content,
    thumbnailUrl,
    desc,
    visibility,
    postUrl,
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
  postId: number
) => {
  const res = await axiosInstance.put(`/posts/${postId}`, {
    title,
    content,
    thumbnailUrl,
    desc,
    visibility,
    postUrl,
  });
  return res.data;
};
