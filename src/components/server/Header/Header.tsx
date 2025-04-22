"use client";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const goToWrite = () => {
    router.push("/write"); // write 페이지로 이동
  };
  const goToHome = () => {
    router.push("/"); // write 페이지로 이동
  };
  const goToProfile = () => {
    router.push("/profile/ksc036"); // write 페이지로 이동
  };
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
