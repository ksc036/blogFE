"use client";
import { useRouter } from "next/navigation";
import axiosInstance from "@/shared/lib/axiosInstance";

export function usePostDelete(postId: number) {
  const router = useRouter();

  const handleDelete = async () => {
    await axiosInstance.delete("/posts", { data: { id: postId } });
    router.push("/");
  };

  return { handleDelete };
}
