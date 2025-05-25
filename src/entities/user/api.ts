import axiosInstance from "@/shared/lib/axiosInstance";
import { Me } from "./types";

export async function getMe(): Promise<Me> {
  const res = await axiosInstance.get(`/users/me`);
  return res.data;
}
