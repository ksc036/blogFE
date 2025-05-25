"use client";

import styles from "./comments.module.css";

import CommentProfile from "@/features/comment/ui/commentProfile/CommentProfile";
import SubComment from "@/features/comment/ui/subComment/SubComment";
import CommentInput from "@/features/comment/ui/CommentInput";
import { useCommentArea } from "../model/useCommentArea";
import { Comment } from "@/entities/comment/types";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";

export default function CommentArea({
  comments,
  postId,
}: {
  comments: Comment[];
  postId: number;
}) {
  const { activeReplyId, setActiveReplyId, reduxComments } =
    useCommentArea(comments);
  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentCount}>{comments.length}개의 댓글</h3>

      <div className={styles.commentList}>
        {reduxComments.map((comment: Comment) => (
          <div key={comment.id} className={styles.comment}>
            <CommentProfile comment={comment}></CommentProfile>
            {!!comment.replies?.length && comment?.replies?.length > 0 && (
              <div className={styles.replyBox}>
                <div className={styles.replyToggle}>
                  {comment.replies!.length}개의 답글
                </div>
                {comment.replies!.map((reply: Comment) => (
                  <div key={reply.id} className={styles.reply}>
                    <CommentProfile comment={reply}></CommentProfile>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.dateAndReply}>
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
            </div>
            {activeReplyId === comment.id && (
              <SubComment
                commentId={comment.id}
                postId={postId}
                setActiveReplyId={setActiveReplyId}
              />
            )}
          </div>
        ))}
        <div className={styles.commentInput}>
          <CommentInput postId={postId} />
        </div>
      </div>
    </div>
  );
}
