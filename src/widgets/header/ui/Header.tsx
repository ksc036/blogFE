"use client";

import styles from "./Header.module.css";
import { useHeaderNavigation } from "../model/useHeaderNavigation";
import Link from "next/link";

export default function Header() {
  const { goToLoginGoogle, goToProfile, isLogined, goToLogOut, me } =
    useHeaderNavigation();

  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <Link href={`https://ksc036.store`} style={{ cursor: "pointer" }}>
          Delog
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          {isLogined && (
            <Link href={`https://${me.subdomain}.ksc036.store/write`}>
              글쓰기
            </Link>
          )}
          {isLogined && (
            <div onClick={goToProfile} style={{ cursor: "pointer" }}>
              profile
            </div>
          )}
          {isLogined ? (
            <div onClick={goToLogOut}>로그아웃</div>
          ) : (
            <div onClick={goToLoginGoogle}>로그인</div>
          )}
        </div>
      </div>
    </header>
  );
}
