"use client";

import { useState } from "react";
import styles from "./SubComment.module.css";
import axiosInstance from "@/shared/lib/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { addReplieComment } from "@/entities/comment/model/commentSlice";
import { useSubCommentInput } from "@/features/comment/model/useSubCommentInput";
// import { RootState } from "@/store"; // store의 타입 정의
export default function SubComment({
  commentId,
  postId,
  setActiveReplyId,
}: {
  commentId: number;
  postId: number;
  setActiveReplyId: (id: number | null) => void;
}) {
  const { text, setText, handleSubmit } = useSubCommentInput(
    commentId,
    postId,
    setActiveReplyId
  );
  return (
    <div className={styles.subCommentBox}>
      <textarea
        className={styles.textarea}
        placeholder="답글을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>
        답글 작성
      </button>
    </div>
  );
}
