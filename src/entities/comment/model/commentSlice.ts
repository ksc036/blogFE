import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "@/entities/comment/model/types";

const initialState = { comments: [] as Comment[] };

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    set: (state, action) => {
      state.comments = action.payload.comments;
    },
    addComment: (state, action: PayloadAction<{ comment: any }>) => {
      state.comments.push(action.payload.comment);
    },
    addReplieComment: (
      state,
      action: PayloadAction<{ parentId: number; comment: Comment }>
    ) => {
      const parent = state.comments.find(
        (c) => c.id === action.payload.parentId
      );
      if (parent) {
        if (!parent.replies) parent.replies = [];
        parent.replies.push(action.payload.comment);
      }
    },
    deleteComment: (state, action: PayloadAction<{ id: number }>) => {
      const targetId = action.payload.id;

      // 1. 최상위 댓글에서 찾기
      console.log(typeof state.comments[0].id);
      console.log(typeof action.payload.id);
      console.log(action.payload.id);
      console.log(state.comments[0].id === action.payload.id);
      const topLevelIndex = state.comments.findIndex((c) => c.id === targetId);
      console.log("topLevelIndex", topLevelIndex);
      if (topLevelIndex !== -1) {
        const comment = state.comments[topLevelIndex];
        if (comment.replies && comment.replies.length > 0) {
          // replies가 있으면 content만 '삭제된 댓글입니다.'로 바꿈
          comment.content = "삭제된 댓글입니다.";
        } else {
          // replies가 없으면 아예 제거
          console.log("댓글 삭제 topLevelIndex", topLevelIndex);
          state.comments.splice(topLevelIndex, 1);
        }

        return;
      }

      // 2. 대댓글(replies)에서 찾기
      for (const comment of state.comments) {
        const replyIndex = comment.replies?.findIndex((r) => r.id === targetId);
        console.log("replyIndex 찾기", replyIndex);
        if (replyIndex !== undefined && replyIndex !== -1) {
          console.log("댓글 삭제 replyIndex", replyIndex);
          comment.replies!.splice(replyIndex, 1); // 대댓글 제거
          return;
        }
      }
    },
    editComment: (
      state,
      action: PayloadAction<{ id: number; content: string }>
    ) => {
      const { id, content } = action.payload;
      // 1. 최상위 댓글에서 찾기
      const topLevelComment = state.comments.find((c) => c.id === id);
      if (topLevelComment) {
        //console.log("topLevelComment 변경!", action.content);
        topLevelComment.content = content;
        return;
      }

      // 2. 대댓글에서 찾기
      for (const comment of state.comments) {
        const reply = comment.replies?.find((r) => r.id === id);
        if (reply) {
          reply.content = content;
          return;
        }
      }
    },
  },
});

export const { set, addComment, addReplieComment, deleteComment, editComment } =
  commentSlice.actions;
export default commentSlice.reducer;
