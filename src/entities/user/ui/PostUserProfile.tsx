"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./PostUserProfile.module.css";

export default function PostUserProfile({ user }) {
  return (
    <Link
      href={`https://${user.subdomain}.ksc036.store`}
      className={styles.contianer}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={
          user.thumbnailUrl
            ? user.thumbnailUrl
            : "https://minio.ksc036.store/log404default/default-profile.png"
        }
        alt="User profile"
        width={24}
        height={24}
        className={styles.avatar}
      />
      <div className={styles.blog}>{user.blogName}</div>
    </Link>
  );
}
