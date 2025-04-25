"use client";

import styles from "./Header.module.css";
import { useHeaderNavigation } from "../model/useHeaderNavigation";

export default function Header() {
  const { goToHome, goToWrite, goToProfile } = useHeaderNavigation();

  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <div onClick={goToHome} style={{ cursor: "pointer" }}>
          Delog logo
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div onClick={goToWrite} style={{ cursor: "pointer" }}>
            새글 작성
          </div>
          <div onClick={goToProfile} style={{ cursor: "pointer" }}>
            profile
          </div>
        </div>
      </div>
      <div className={styles.mainHeader}>
        <div>트랜딩 | 최신 | 피드 </div>
        <div>이번주</div>
      </div>
    </header>
  );
}
