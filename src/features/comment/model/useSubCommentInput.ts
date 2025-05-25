import { postSubComment } from "@/entities/comment/api";
import { addReplieComment, set } from "@/entities/comment/model/commentSlice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useState } from "react";

export function useSubCommentInput(
  commentId: number,
  postId: number,
  setActiveReplyId: (id: number | null) => void
) {
  //   //console.log("type checkin function", typeof setActiveReplyId);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.user.me);
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("빈 댓글은 작성할 수 없습니다.");
      return;
    }
    const res = await postSubComment(postId, text, commentId);
    res.user = me;
    dispatch(addReplieComment({ parentId: commentId, comment: res }));
    setText("");
    setActiveReplyId(null);
  };
  return { text, setText, handleSubmit };
}
