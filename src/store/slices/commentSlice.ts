import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// id: 1,
// nickname: "닉네임",
// date: "2023-10-01",
// content: "댓글 내용",
// replies: [
//   {
//     id: 2,
//     nickname: "답글 작성자",
//     date: "2023-10-02",
//     content: "답글 내용",
//   },
// ],
const initialState = { comments: [] };

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
  },
});

export const { set, addComment, addReplieComment } = commentSlice.actions;
export default commentSlice.reducer;
