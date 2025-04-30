import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Me } from "./types";

const initialState = { me: {}, isLogined: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<{ me: Me }>) => {
      console.log(action.payload.me);
      state.me = action.payload.me;
      state.isLogined = true;
    },
    logout: (state) => {
      state.me = {};
      state.isLogined = false;
    },
    updateMeField: (
      state,
      action: PayloadAction<{ field: keyof Me; value: string }>
    ) => {
      if (state.me) {
        state.me[action.payload.field] = action.payload.value;
      }
    },
  },
});

export const { setMe, logout, updateMeField } = userSlice.actions;
export default userSlice.reducer;
