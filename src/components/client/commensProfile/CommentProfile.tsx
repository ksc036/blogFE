"user client";
import axiosInstance from "@/lib/axiosInstance";
import styles from "./CommentProfile.module.css";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "@/store/slices/commentSlice";
import { useState } from "react";

export default function CommentProfile({ comment }: { comment: any }) {
  const dispatch = useDispatch();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const handleEdit = (id: number) => {
    console.log("Edit comment:", {
      id: id,
      postId: comment.postId,
      content: editContent,
    });
    axiosInstance
      .put(`/comments`, {
        id: comment.id,
        postId: comment.postId,
        content: editContent,
      })
      .then(({ data }) => {
        dispatch(editComment({ id: data.id, content: data.content }));
        setEditCommentId(null);
      });
  };

  const handleDelete = () => {
    try {
      axiosInstance
        .delete(`/comments`, {
          data: {
            id: comment.id,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(deleteComment({ id: res.data }));
        });
    } catch (e) {
      console.error("Error deleting comment:", e);
    }
    // Delete comment logic here
  };

  const handleToggleEdit = (comment: any) => {
    if (editCommentId === comment.id) {
      setEditCommentId(null); // ✅ 같은 댓글을 다시 누르면 닫힘
    } else {
      setEditCommentId(comment.id);
      setEditContent(comment.content);
    }
  };
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
          <img
            className={styles.avatar}
            src="/default-profile.png"
            alt="프로필"
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              onClick={() => {
                handleToggleEdit(comment); // ✅ 댓글 수정 버튼 클릭 시
              }}
            >
              수정
            </div>
            <div onClick={handleDelete}>삭제</div>
            <div>{comment.id}</div>
          </div>
        </div>

        <div>
          <div className={styles.nickname}>{comment.nickname}</div>
          <div className={styles.date}>{comment.date}</div>
        </div>
      </div>

      {editCommentId === comment.id ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.textarea}
          />
          <button
            onClick={() => handleEdit(comment.id)}
            className={styles.submitButton}
          >
            저장
          </button>
        </>
      ) : (
        <div className={styles.content}>{comment.content}</div>
      )}
      {/* <div className={styles.content}>{comment.content}</div> */}
    </div>
  );
}
