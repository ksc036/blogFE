"use client";
import { useState } from "react";
import styles from "./PostActionBar.module.css";
import axiosInstance from "@/shared/lib/axiosInstance";
interface PostActionBarProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}
export default function PostActionBar({
  isLiked,
  likeCount,
  postId,
}: PostActionBarProps) {
  const [likeCnt, setLikeCnt] = useState(likeCount);
  const [isLike, setIsLike] = useState(isLiked);

  const handleLikeToggle = async () => {
    try {
      if (isLike) {
        await axiosInstance.delete(`/posts/${postId}/like`);
        setLikeCnt((prev) => prev - 1);
      } else {
        await axiosInstance.post(`/posts/${postId}/like`);
        setLikeCnt((prev) => prev + 1);
      }
      setIsLike(!isLike);
    } catch (err) {
      console.error("좋아요 요청 실패", err);
    }
  };

  return (
    <div className={styles.actionBar}>
      <button className={styles.likeButton} onClick={handleLikeToggle}>
        {isLike ? "♥" : "♡"} {likeCnt}
      </button>
      <button className={styles.shareButton}>🔗 공유</button>
    </div>
  );
}
