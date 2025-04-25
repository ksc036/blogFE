"use client";

import { useRouter } from "next/navigation";

export function useHeaderNavigation() {
  const router = useRouter();

  const goToWrite = () => {
    router.push("/write");
  };

  const goToHome = () => {
    router.push("/");
  };

  const goToProfile = () => {
    router.push("/profile/ksc036");
  };

  return { goToWrite, goToHome, goToProfile };
}
