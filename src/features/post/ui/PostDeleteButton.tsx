"use client";
import { useAppSelector } from "@/shared/store/hooks";
import { usePostDelete } from "../model/usePostDelete";
export default function PostDeleteButton({ postId }: { postId: number }) {
  const { handleDelete } = usePostDelete(postId);
  return <button onClick={handleDelete}>삭제</button>;
}
