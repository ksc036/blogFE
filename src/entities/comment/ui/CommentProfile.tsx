"use client";

import styles from "./CommentProfile.module.css";
import { Comment } from "@/entities/comment/model/types";

type Props = {
  comment: Comment;
  onEditClick: (comment: Comment) => void;
  onDeleteClick: () => void;
};

export default function CommentProfile({
  comment,
  onEditClick,
  onDeleteClick,
}: Props) {
  return (
    <div className={styles.commentHeader}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <img
          className={styles.avatar}
          src="/default-profile.png"
          alt="프로필"
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div onClick={() => onEditClick(comment)}>수정</div>
          <div onClick={onDeleteClick}>삭제</div>
        </div>
      </div>
      <div>
        <div className={styles.nickname}>{comment.nickname}</div>
        <div className={styles.date}>{comment.date}</div>
      </div>
      <div className={styles.content}>{comment.content}</div>
    </div>
  );
}
