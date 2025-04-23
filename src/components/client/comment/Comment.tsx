"use client";

import { useState } from "react";
import styles from "./Comment.module.css";
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/slices/commentSlice"; // 경로는 프로젝트 구조에 맞게 수정

export default function CommentInput({ postId }: { postId: number }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const res = await axiosInstance.post("/comments", {
        postId,
        content: comment,
      });

      const newComment = res.data; // 서버에서 반환한 새 댓글
      console.log(newComment);
      dispatch(addComment({ comment: newComment })); // ✅ Redux에 push

      setComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.inputBox}>
      <textarea
        placeholder="댓글을 작성하세요"
        className={styles.textarea}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={styles.submitButton} onClick={handleSubmit}>
        댓글 작성
      </button>
    </div>
  );
}
