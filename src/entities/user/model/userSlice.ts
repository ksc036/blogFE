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
      console.log("updateMeField", action.payload.field, action.payload.value);
      try {
        if (state.me) {
          state.me[action.payload.field] = action.payload.value;
        }
      } catch (error) {
        console.error("Error updating user field:", error);
      }
    },
    testUserInput: (state, action) => {
      console.log("testUserInput", action.payload.field, action.payload.value);
      const me: Me = {
        id: 3,
        name: "홍길동",
        email: "hong@example.com",
        subdomain: "gildong",
        bio: "기록을 사랑하는 개발자입니다.",
        blogName: "길동 블로그",
        thumbnailUrl:
          "https://minio.ksc036.store/delog/uploads/1746009561156_ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%2030%EC%9D%BC%20%EC%98%A4%ED%9B%84%2007_39_17.png",
      };
      try {
        state.isLogined = true;
        if (state.me) {
          state.me = me;
        }
      } catch (error) {
        console.error("Error updating user field:", error);
      }
    },
  },
});

export const { setMe, logout, updateMeField, testUserInput } =
  userSlice.actions;
export default userSlice.reducer;
