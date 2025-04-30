"use client";

import styles from "./Header.module.css";
import { useHeaderNavigation } from "../model/useHeaderNavigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { goToLoginGoogle, goToProfile, isLogined, goToLogOut, me } =
    useHeaderNavigation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <Link href="https://ksc036.store" style={{ cursor: "pointer" }}>
          Notefic
        </Link>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {isLogined && (
            <Link href={`https://${me.subdomain}.ksc036.store/write`}>
              새 글 작성
            </Link>
          )}

          {isLogined ? (
            <div className={styles.profileWrapper} onClick={toggleDropdown}>
              <Image
                src={
                  me.thumbnailUrl ??
                  "https://minio.ksc036.store/delog/uploads/1746009561156_ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%2030%EC%9D%BC%20%EC%98%A4%ED%9B%84%2007_39_17.png"
                }
                alt="프로필 이미지"
                width={32}
                height={32}
                className={styles.profileImage}
              />
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href={`https://${me.subdomain}.ksc036.store`}>
                    <div>내 블로그</div>
                  </Link>
                  <Link href={`https://${me.subdomain}.ksc036.store/write`}>
                    <div>글쓰기기</div>
                  </Link>
                  <Link href={`https://${me.subdomain}.ksc036.store/reading`}>
                    <div>읽기 목록</div>
                  </Link>
                  <Link href={`https://${me.subdomain}.ksc036.store/profile`}>
                    <div>프로필 설정정</div>
                  </Link>
                  <div onClick={goToLogOut}>로그아웃</div>
                </div>
              )}
            </div>
          ) : (
            <div onClick={goToLoginGoogle} style={{ cursor: "pointer" }}>
              로그인
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
