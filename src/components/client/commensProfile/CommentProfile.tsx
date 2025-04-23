"user client";
import axiosInstance from "@/lib/axiosInstance";
import styles from "./CommentProfile.module.css";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "@/store/slices/commentSlice";

export default function CommentProfile({ comment }: { comment: any }) {
  const dispatch = useDispatch();
  const handleEdit = () => {
    axiosInstance
      .put(`/comments`, {
        data: {
          id: comment.id,
          postId: comment.postId,
          content: comment.content,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(editComment({ id: res.id, content: res.content }));
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
          <div onClick={handleEdit}>수정</div>
          <div onClick={handleDelete}>삭제</div>
          <div>{comment.id}</div>
        </div>
      </div>

      <div>
        <div className={styles.nickname}>{comment.nickname}</div>
        <div className={styles.date}>{comment.date}</div>
      </div>
    </div>
  );
}
