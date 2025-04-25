import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: 0 };

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    set: (state) => {
      state.id = 1;
    },
  },
});

export const { set } = postSlice.actions;
export default postSlice.reducer;
