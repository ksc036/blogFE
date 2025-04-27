"use client";

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

  return { goToWrite, goToHome, goToUserPage, goToProfile };
}
