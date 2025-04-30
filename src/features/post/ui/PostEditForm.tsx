"use client";

import { useAppSelector } from "@/shared/store/hooks";
import PostDeleteButton from "./PostDeleteButton";
import PostEditButton from "@/features/post/ui/PostEditButton";
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
        <div>
          <PostDeleteButton postId={postId}></PostDeleteButton>
          <PostEditButton postId={postId}></PostEditButton>
        </div>
      )}
    </div>
  );
}
