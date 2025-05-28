"use client";

import { useEffect, ReactNode } from "react";
import { getMe } from "@/entities/user/api"; // 서버에서 내 정보 가져오는 함수
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { setMe } from "@/entities/user/model/userSlice";

export function AuthProvider({ children }: { children: ReactNode }) {
  const me = useAppSelector((state) => state.user.me); // redux에 저장된 유저 정보
  const isLogined = useAppSelector((state) => state.user.isLogined); // redux에 저장된 유저 정보
  const dispatch = useAppDispatch(); // redux dispatch 함수
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        dispatch(setMe({ me: data })); // redux store 업데이트
      } catch (error) {
        console.error("유저 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    if (!isLogined) {
      fetchUser();
    }
  }, []);

  return <div>{children}</div>;
}
