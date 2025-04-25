import { set } from "@/entities/comment/model/commentSlice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { RootState } from "@/shared/store";
import { useEffect, useState } from "react";

export function useCommentArea(comments: any[]) {
  const dispatch = useAppDispatch();
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  useEffect(() => {
    dispatch(set({ comments }));
  }, [comments, dispatch]);
  const reduxComments = useAppSelector(
    (state: RootState) => state.comment.comments
  );

  return { activeReplyId, setActiveReplyId, reduxComments };
}
