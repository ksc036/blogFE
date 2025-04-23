"use client";

import { useState } from "react";
import styles from "./comments.module.css";
import Comment from "@/components/client/comment/Comment";
import SubComment from "@/components/client/subComment/SubComment";

// const comments = [
//   {
//     id: 1,
//     nickname: "윤성현",
//     date: "2025년 4월 11일",
//     content: "이전글 번역본도 있을까요?",
//     replies: [
//       {
//         id: 11,
//         nickname: "Nguyễn Bá Chemical",
//         date: "5일 전",
//         content: "Hello! Nice to meet you!",
//       },
//     ],
//   },
// ];

export default function Comments({
  comments,
  postId,
}: {
  comments: any[];
  postId: number;
}) {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentCount}>{comments.length}개의 댓글</h3>
      <Comment postId={postId} />

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <img
                className={styles.avatar}
                src="/default-profile.png"
                alt="프로필"
              />
              <div>
                <div className={styles.nickname}>{comment.nickname}</div>
                <div className={styles.date}>{comment.date}</div>
              </div>
            </div>
            <div className={styles.content}>{comment.content}</div>

            {comment.replies?.length > 0 && (
              <div className={styles.replyBox}>
                <div className={styles.replyToggle}>
                  {comment.replies.length}개의 답글
                </div>
                {comment.replies.map((reply) => (
                  <div key={reply.id} className={styles.reply}>
                    <div className={styles.commentHeader}>
                      <img
                        className={styles.avatar}
                        src="/default-profile.png"
                        alt="프로필"
                      />
                      <div>
                        <div className={styles.nickname}>{reply.nickname}</div>
                        <div className={styles.date}>{reply.date}</div>
                      </div>
                    </div>
                    <div className={styles.content}>{reply.content}</div>
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
              답글 달기
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
