"use client";

import styles from "./Header.module.css";
import { useHeaderNavigation } from "../model/useHeaderNavigation";
import Link from "next/link";

export default function Header() {
  const {
    goToLoginGoogle,
    goToUserPage,
    goToHome,
    goToWrite,
    goToProfile,
    isLogined,
    goToLogOut,
    me,
  } = useHeaderNavigation();

  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <div onClick={goToHome} style={{ cursor: "pointer" }}>
          Delog logo
          <span onClick={goToUserPage}> 사용자 페이지</span>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          {isLogined && (
            <Link href={`https://${me.subdomain}.ksc036.store/write`}></Link>
            // <div onClick={goToWrite} style={{ cursor: "pointer" }}>
            //   새글 작성
            // </div>
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
      {/* <div className={styles.mainHeader}>
        <div>트랜딩 | 최신 | 피드 </div>
        <div>이번주</div>
      </div> */}
    </header>
  );
}
