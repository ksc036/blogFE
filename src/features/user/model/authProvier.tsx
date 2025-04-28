"use client";

import { useEffect, ReactNode } from "react";
import { getMe } from "@/entities/user/api/getUsers"; // 서버에서 내 정보 가져오는 함수
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { setMe } from "@/entities/user/model/userSlice";

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.user); // redux에 저장된 유저 정보

  useEffect(() => {
    const fetchUser = async () => {
      const dispatch = useAppDispatch(); // redux dispatch 함수
      try {
        const data = await getMe();
        dispatch(setMe({ me: data })); // redux store 업데이트
      } catch (error) {
        console.error("유저 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  return <div>{children}</div>;
}
