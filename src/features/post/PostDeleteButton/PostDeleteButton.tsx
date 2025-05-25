"use client";
import { usePostDelete } from "../hooks/usePostDelete";
export default function PostDeleteButton({ postId }: { postId: number }) {
  const { handleDelete } = usePostDelete(postId);
  return (
    <div style={{ cursor: "pointer" }} onClick={handleDelete}>
      삭제
    </div>
  );
}
