import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Me } from "../types";
interface UserState {
  me: Me | null;
  isLogined: boolean;
}

// const initialState = { me: {}, isLogined: false };
const initialState: UserState = {
  me: null,
  isLogined: false,
};
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
      state.me = null;
      state.isLogined = false;
    },
    updateMeField: (
      state,
      action: PayloadAction<{ field: keyof Me; value: Me[keyof Me] }>
    ) => {
      console.log("updateMeField", action.payload.field, action.payload.value);
      try {
        if (state.me) {
          const key = action.payload.field;
          const value = action.payload.value;
          (state.me as Record<keyof Me, Me[keyof Me]>)[key] = value;
        }
      } catch (error) {
        console.error("Error updating user field:", error);
      }
    },
  },
});

export const { setMe, logout, updateMeField } = userSlice.actions;
export default userSlice.reducer;
