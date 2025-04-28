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

  const goToWrite = () => {
    router.push("/write");
  };
  const goToHome = () => {
    window.location.href = "https://ksc036.store/";
  };
  const goToUserPage = () => {
    router.push("/");
  };

  const goToProfile = () => {
    router.push(`https://${me.subdomain}.ksc036.store/`);
  };
  const goToLoginGoogle = async () => {
    const { data } = await axiosInstance.get("/users/social/google");
    const { url } = data;
    window.location.href = url;
  };
  const goToLogOut = async () => {
    dispatch(logout());
  };

  const isLogined = useAppSelector((state: RootState) => state.user.isLogined);

  return {
    goToWrite,
    goToHome,
    goToUserPage,
    goToProfile,
    goToLoginGoogle,
    isLogined,
    goToLogOut,
  };
}
