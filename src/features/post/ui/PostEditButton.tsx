// components/client/EditButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function postEdit({ postId }: { postId: number }) {
  const router = useRouter();
  return <div onClick={() => router.push(`/write/${postId}`)}>수정</div>;
  // return <div onClick={() => router.push(`/write`)}>수정</div>;
}
