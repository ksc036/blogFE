"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "@/entities/comment/model/commentSlice";
import { postComment } from "@/entities/comment/api/postComment";
import { useAppSelector } from "@/shared/store/hooks";

export function useCommentInput(postId: number) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const me = useAppSelector((state) => state.user.me);
  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = await postComment(postId, comment);
      newComment.user = me;
      dispatch(addComment({ comment: newComment }));
      setComment("");
    } catch (e) {
      //console.error("댓글 작성 실패:", e);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  return { comment, setComment, handleSubmit };
}
