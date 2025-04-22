// components/client/EditButton.tsx
"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

export default function postDelete({ postId }: { postId: string }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        axiosInstance.delete(`/posts`, {
          data: { id: postId },
        });
        router.push(`/`);
      }}
    >
      삭제
    </div>
  );
  // return <div onClick={() => router.push(`/write`)}>수정</div>;
}
