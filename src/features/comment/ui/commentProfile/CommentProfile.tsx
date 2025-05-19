"user client";
import styles from "./CommentProfile.module.css";
import { Comment } from "@/entities/comment/model/types";
import { useCommentProfile } from "@/features/comment/model/useCommentProfile";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import Link from "next/link";

export default function CommentProfile({ comment }: { comment: Comment }) {
  const {
    handleDelete,
    handleEdit,
    handleToggleEdit,
    editContent,
    setEditContent,
    editCommentId,
    me,
  } = useCommentProfile({
    comment,
  });
  console.log("ccccc", comment);
  return (
    <div>
      <div className={styles.commentHeader}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link
            href={`https://${comment.user?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <img
              className={styles.avatar}
              src={
                comment.user?.thumbnailUrl
                  ? comment.user?.thumbnailUrl
                  : "/images/common/default-profile.png"
              }
              alt="프로필"
            />
            <div>
              <div>{comment.user?.blogName}</div>
              <div className={styles.date}>
                {formatToKoreanDate(comment?.createdAt)}
              </div>
            </div>
          </Link>

          {me?.id === comment.userId && (
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                onClick={() => {
                  handleToggleEdit(); // ✅ 댓글 수정 버튼 클릭 시
                }}
              >
                수정
              </div>
              <div onClick={handleDelete}>삭제</div>
              {/* <div>{comment.id}</div> */}
            </div>
          )}
        </div>
      </div>

      {editCommentId === comment.id ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={() => handleEdit()} className={styles.submitButton}>
            저장
          </button>
        </>
      ) : (
        <div className={styles.content}>{comment.content}</div>
      )}
    </div>
  );
}
