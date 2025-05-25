"use client";

import { useAppSelector } from "@/shared/store/hooks";
import PostDeleteButton from "../PostDeleteButton/PostDeleteButton";
import PostEditButton from "@/features/post/PostEditButton/PostEditButton";
export default function PostEditForm({
  postUserId,
  postId,
}: {
  postUserId: number;
  postId: number;
}) {
  const me = useAppSelector((state) => state.user.me);
  return (
    <div>
      {me?.id === postUserId && (
        <div style={{ display: "flex", gap: "8px" }}>
          <PostDeleteButton postId={postId}></PostDeleteButton>
          <PostEditButton postId={postId}></PostEditButton>
        </div>
      )}
    </div>
  );
}
