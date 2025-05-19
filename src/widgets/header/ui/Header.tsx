"use client";

import styles from "./Header.module.css";
import { useHeaderNavigation } from "../model/useHeaderNavigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/shared/store/hooks";
import { testUserInput } from "@/entities/user/model/userSlice";
import LoginModal from "@/features/comment/ui/LoginModal/LoginModal";

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
        <Link href="https://ksc036.store" style={{ cursor: "pointer" }}>
          {/* <img
            src="https://minio.ksc036.store/log404default/logo.png"
            width={100}
            height={90}
            alt=""
          /> */}
          <picture>
            <source
              srcSet="https://minio.ksc036.store/log404default/logo-black-version.png"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="https://minio.ksc036.store/log404default/logo-white-version.png"
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
                  src={
                    me.thumbnailUrl ??
                    "https://minio.ksc036.store/delog/uploads/1746009561156_ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%2030%EC%9D%BC%20%EC%98%A4%ED%9B%84%2007_39_17.png"
                  }
                  alt="프로필 이미지"
                  width={40}
                  height={40}
                  className={styles.profileImage}
                />
                <span className={styles.arrow}>▼</span> {/* ▼ 아이콘 추가 */}
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link href={`https://${me.subdomain}.ksc036.store`}>
                      <div>내 블로그</div>
                    </Link>
                    <Link href={`https://${me.subdomain}.ksc036.store/write`}>
                      <div>글쓰기</div>
                    </Link>
                    <Link href={`https://${me.subdomain}.ksc036.store/profile`}>
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
