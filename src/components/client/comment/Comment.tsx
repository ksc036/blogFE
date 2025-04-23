"use client";

import { useState } from "react";
import styles from "./Comment.module.css";
import axiosInstance from "@/lib/axiosInstance";

export default function CommentInput({ postId }: { postId: number }) {
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    alert(`댓글 작성됨: ${comment}`);
    //post id 추가해야함
    axiosInstance.post("/comments", {
      postId: postId,
      content: comment,
    });
    setComment("");
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
