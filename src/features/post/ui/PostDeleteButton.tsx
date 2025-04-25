"use client";
import { usePostDelete } from "../model/usePostDelete";

export default function PostDeleteButton({ postId }: { postId: string }) {
  const { handleDelete } = usePostDelete(postId);
  return <button onClick={handleDelete}>삭제</button>;
}
