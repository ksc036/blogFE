"use client";

import styles from "./Header.module.css";
import { useHeaderNavigation } from "../model/useHeaderNavigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/shared/store/hooks";
import LoginModal from "@/features/comment/LoginModal/LoginModal";

export default function Header() {
  const dispatch = useAppDispatch();
  const { goToLoginGoogle, goToProfile, isLogined, goToLogOut, me } =
    useHeaderNavigation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const test = () => {
    // dispatch(testUserInput(1));\
    setIsDropdownOpen(true);
  };
  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <Link
          href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
          style={{ cursor: "pointer" }}
        >
          <picture>
            <source
              srcSet="/images/darkmode/logo.png"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="/images/lightmode/logo.png"
              alt="로고"
              width={100}
              height={90}
            />
          </picture>
        </Link>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {isLogined ? (
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div onClick={goToLogOut} style={{ cursor: "pointer" }}>
                로그아웃
              </div>
              <div className={styles.profileWrapper} onClick={toggleDropdown}>
                <img
                  src={me?.thumbnailUrl ?? "/images/common/default-profile.png"}
                  alt="프로필 이미지"
                  width={40}
                  height={40}
                  className={styles.profileImage}
                />
                <span className={styles.arrow}>▼</span> {/* ▼ 아이콘 추가 */}
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link
                      href={`https://${me?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
                    >
                      <div>내 블로그</div>
                    </Link>
                    <Link
                      href={`https://${me?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/write`}
                    >
                      <div>글쓰기</div>
                    </Link>
                    <Link
                      href={`https://${me?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/profile`}
                    >
                      <div>프로필 설정</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* <div onClick={goToLoginGoogle} style={{ cursor: "pointer" }}>
                로그인
              </div> */}
              <div
                onClick={() => setOpenLoginModal(true)}
                style={{ cursor: "pointer" }}
              >
                로그인
              </div>
              {openLoginModal && (
                <LoginModal onClose={() => setOpenLoginModal(false)} />
              )}
            </div>
          )}
        </div>
      </div>
      {/* <div className={styles.test} onClick={test}>
        테스트버튼
      </div> */}
    </header>
  );
}
