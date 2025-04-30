"use client";

import { logout } from "@/entities/user/model/userSlice";
import axiosInstance from "@/shared/lib/axiosInstance";
import { RootState } from "@/shared/store";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useRouter } from "next/navigation";

export function useHeaderNavigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state: RootState) => state.user.me);
  const isLogined = useAppSelector((state: RootState) => state.user.isLogined);
  // const subdomain = getSubdomainFromCookie();

  const goToProfile = () => {
    router.push(`https://${me.subdomain}.ksc036.store`);
  };
  const goToLoginGoogle = async () => {
    const { data } = await axiosInstance.get("/users/social/google");
    const { url } = data;
    window.location.href = url;
  };
  const goToLogOut = async () => {
    try {
      const { data } = await axiosInstance.post("/users/logout");
      console.log("data", data);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
    router.push(`https://ksc036.store`);
  };

  return {
    goToProfile,
    goToLoginGoogle,
    isLogined,
    goToLogOut,
    me,
  };
}
