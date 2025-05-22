"use client";
import { useState } from "react";
import styles from "./PostActionBar.module.css";
import axiosInstance from "@/shared/lib/axiosInstance";
import { Post } from "../../model/types";
interface PostActionBarProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
  post: Post;
}
export default function PostActionBar({
  isLiked,
  likeCount,
  postId,
  post,
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
      <button
        className={styles.shareButton}
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: post.title,
                text: post.desc,
                url: window.location.href,
              })
              .then(() => console.log("공유 성공"))
              .catch(console.error);
          } else {
            alert("공유 기능을 지원하지 않는 브라우저입니다.");
          }
        }}
      >
        🔗 공유
      </button>
    </div>
  );
}
