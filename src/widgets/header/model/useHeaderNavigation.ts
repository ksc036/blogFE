"use client";

import axiosInstance from "@/shared/lib/axiosInstance";
import { useRouter } from "next/navigation";

export function useHeaderNavigation() {
  const router = useRouter();

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
    router.push("/profile/ksc036");
  };
  const goToLoginGoogle = () => {
    axiosInstance.get("/users/social/google").then((res) => {});
  };
  return { goToWrite, goToHome, goToUserPage, goToProfile, goToLoginGoogle };
}
