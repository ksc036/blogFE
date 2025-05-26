"use server";

import { cookies } from "next/headers";
import { createServerAxios } from "@/shared/lib/axiosInstnaceServer";

export async function getUserBlogData(subdomain: string) {
  const cookiedata = await cookies();
  const cookie = cookiedata.toString();
  console.log("cookie:::::::::::", cookie);
  const axiosServerInstance = createServerAxios(cookie);
  const res = await axiosServerInstance.get(`/users/blogProfile/${subdomain}`);
  return res.data;
}
