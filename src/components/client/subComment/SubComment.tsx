"use client";

import { useState } from "react";
import styles from "./SubComment.module.css";

export default function SubComment({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className={styles.subCommentBox}>
      <textarea
        className={styles.textarea}
        placeholder="답글을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
      >
        답글 작성
      </button>
    </div>
  );
}
