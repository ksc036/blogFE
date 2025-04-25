import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../entities/user/model/userSlice";
import postReducer from "../../entities/post/model/postSlice";
import commentReducer from "../../entities/comment/model/commentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
