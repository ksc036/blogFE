import { postSubComment } from "@/entities/comment/api/postComment";
import { addReplieComment, set } from "@/entities/comment/model/commentSlice";
import { useAppDispatch } from "@/shared/store/hooks";
import { useState } from "react";

export function useSubCommentInput(
  commentId: number,
  postId: number,
  setActiveReplyId: (id: number | null) => void
) {
  //   //console.log("type checkin function", typeof setActiveReplyId);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    const res = await postSubComment(postId, text, commentId);
    dispatch(addReplieComment({ parentId: commentId, comment: res }));
    setText("");
    setActiveReplyId(null);
  };
  return { text, setText, handleSubmit };
}
