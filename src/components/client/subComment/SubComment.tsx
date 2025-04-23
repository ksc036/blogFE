"use client";

import { useState } from "react";
import styles from "./SubComment.module.css";
import axiosInstance from "@/lib/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { addReplieComment } from "@/store/slices/commentSlice";
// import { RootState } from "@/store"; // store의 타입 정의
export default function SubComment({
  commentId,
  postId,
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // const reduxComments = useSelector(
  //   (state: RootState) => state.comment.comments
  // );
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
        onClick={async () => {
          const comment = await axiosInstance.post("/comments", {
            postId: postId,
            content: text,
            parentId: commentId,
          });
          console.log(comment);
          dispatch(
            addReplieComment({ parentId: commentId, comment: comment.data })
          );
          onSubmit(text); // 부모 컴포넌트에 답글 전송
          setText("");
        }}
      >
        답글 작성
      </button>
    </div>
  );
}
