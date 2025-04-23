"use client";

import { useEffect, useState } from "react";
import styles from "./comments.module.css";
import Comment from "@/components/client/comment/Comment";
import SubComment from "@/components/client/subComment/SubComment";
import { set } from "@/store/slices/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; // store의 타입 정의
import CommentProfile from "@/components/client/commensProfile/CommentProfile";
export default function Comments({
  comments,
  postId,
}: {
  comments: any[];
  postId: number;
}) {
  const dispatch = useDispatch();
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  useEffect(() => {
    dispatch(set({ comments }));
  }, [comments, dispatch]);
  const reduxComments = useSelector(
    (state: RootState) => state.comment.comments
  );
  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentCount}>{comments.length}개의 댓글</h3>
      <Comment postId={postId} />

      <div className={styles.commentList}>
        {reduxComments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <CommentProfile comment={comment}></CommentProfile>

            {comment.replies?.length > 0 && (
              <div className={styles.replyBox}>
                <div className={styles.replyToggle}>
                  {comment.replies.length}개의 답글
                </div>
                {comment.replies.map((reply) => (
                  <div key={reply.id} className={styles.reply}>
                    <CommentProfile comment={reply}></CommentProfile>
                  </div>
                ))}
              </div>
            )}

            <div
              className={styles.replyWrite}
              onClick={() =>
                setActiveReplyId((prev) =>
                  prev === comment.id ? null : comment.id
                )
              }
            >
              답글달기
            </div>

            {activeReplyId === comment.id && (
              <SubComment
                commentId={comment.id}
                postId={postId}
                onSubmit={(text) => {
                  console.log(comment.id);
                  console.log(`댓글 ${comment.id}에 대한 답글: ${text}`);
                  setActiveReplyId(null);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
