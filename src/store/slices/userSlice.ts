import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: 0 };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state) => {
      state.id = 1;
    },
  },
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
