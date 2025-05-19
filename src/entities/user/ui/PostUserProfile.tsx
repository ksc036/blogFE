"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./PostUserProfile.module.css";
import { Me } from "../model/types";

export default function PostUserProfile({ user }: { user: Me }) {
  return (
    <Link
      href={`https://${user?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
      className={styles.contianer}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={
          user?.thumbnailUrl
            ? user.thumbnailUrl
            : "/images/common/default-profile.png"
        }
        alt="User profile"
        width={24}
        height={24}
        className={styles.avatar}
      />
      <div className={styles.blog}>{user?.blogName}</div>
    </Link>
  );
}
