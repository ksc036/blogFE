"use server";

import { cookies } from "next/headers";
import { createServerAxios } from "@/shared/lib/axiosInstnaceServer";

export async function getUserBlogData(subdomain: string, page: number = 1) {
  //mine인지아닌지 판별해야함.(visibility가 false인거 보려고)
  const cookiedata = await cookies();
  const cookie = cookiedata.toString();
  const axiosServerInstance = createServerAxios(cookie);
  const res = await axiosServerInstance.get(`/users/blogProfile/${subdomain}`, {
    params: {
      page,
    },
  });
  return res.data;
}
export async function getUserBlogDataWithTag(
  userId: number,
  page: number = 1,
  tagIds: number[] = []
) {
  //mine인지아닌지 판별해야함.(visibility가 false인거 보려고)s
  const cookiedata = await cookies();
  const cookie = cookiedata.toString();
  const axiosServerInstance = createServerAxios(cookie);
  const res = await axiosServerInstance.get(`/users/blogPostsWithTag`, {
    params: {
      userId,
      page,
      canonicalTagIds: tagIds,
    },
  });
  return res.data;
}
