"use client";

import { deleteCommentApi, putCommentApi } from "@/entities/comment/api";
import {
  editComment,
  deleteComment,
} from "@/entities/comment/model/commentSlice";
import { Comment } from "@/entities/comment/types";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useCommentProfile({ comment }: { comment: Comment }) {
  const dispatch = useAppDispatch();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const me = useAppSelector((state) => state.user.me);

  const handleEdit = async () => {
    if (!editContent.trim()) {
      alert("빈 댓글로 수정할 수 없습니다.");
      return;
    }
    const res = await putCommentApi(comment.id, comment.postId, editContent);
    dispatch(editComment({ id: res.id, content: res.content }));
    setEditCommentId(null);
  };

  const handleDelete = async () => {
    const res = await deleteCommentApi(comment.id);
    dispatch(deleteComment({ id: res }));
  };

  const handleToggleEdit = () => {
    if (editCommentId === comment.id) {
      setEditCommentId(null); // ✅ 같은 댓글을 다시 누르면 닫힘
    } else {
      setEditCommentId(comment.id);
      setEditContent(comment.content);
    }
  };

  return {
    handleEdit,
    handleDelete,
    handleToggleEdit,
    editContent,
    setEditContent,
    editCommentId,
    me,
  };
}
