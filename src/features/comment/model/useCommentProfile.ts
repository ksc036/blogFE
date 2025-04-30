"use client";

import {
  deleteCommentApi,
  putCommentApi,
} from "@/entities/comment/api/changeComment";
import {
  editComment,
  deleteComment,
} from "@/entities/comment/model/commentSlice";
import { Comment } from "@/entities/comment/model/types";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useCommentProfile({ comment }: { comment: Comment }) {
  const dispatch = useAppDispatch();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const me = useAppSelector((state) => state.auth.me);

  const handleEdit = async () => {
    //console.log("editCommentId", comment);
    const res = await putCommentApi(comment.id, comment.postId, editContent);
    dispatch(editComment({ id: res.id, content: res.content }));
    setEditCommentId(null);
  };

  const handleDelete = async () => {
    const res = await deleteCommentApi(comment.id);
    dispatch(deleteComment({ id: res.data }));
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
