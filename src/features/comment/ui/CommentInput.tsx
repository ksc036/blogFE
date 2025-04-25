"use client";

import styles from "./CommentInput.module.css";
import { useCommentInput } from "../model/useCommentInput";

export default function CommentInput({ postId }: { postId: number }) {
  const { comment, setComment, handleSubmit } = useCommentInput(postId);

  return (
    <div className={styles.inputBox}>
      <textarea
        className={styles.textarea}
        placeholder="댓글을 작성하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={styles.submitButton} onClick={handleSubmit}>
        댓글 작성
      </button>
    </div>
  );
}
