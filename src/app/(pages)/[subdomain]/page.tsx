import axiosInstance from "@/shared/lib/axiosInstance";
import styles from "./BlogPage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default async function BlogPage({ params }) {
  const { subdomain } = await params;
  const res = await axiosInstance.get(`users/blogProfile/${subdomain}`);
  const data = res.data;
  return (
    <main className={styles.container}>
      <section className={styles.profileSection}>
        <Link href={`/posts/${data.post.id}`}>
          <Image
            src={data.user.thumbnailUrl}
            alt="User profile"
            width={80}
            height={80}
            className={styles.avatar}
          />
          <div className={styles.profileInfo}>
            <h2 className={styles.name}>{data.user.blogName}</h2>
            <p className={styles.bio}>{data.user.bio}</p>
          </div>
        </Link>
      </section>

      {/* 포스트 목록 */}
      <section className={styles.postList}>
        {data.posts.map((post) => (
          <article key={post.id} className={styles.postCard}>
            <Image
              src={post.thumbnailUrl}
              width={80}
              height={80}
              className={styles.thumbnail}
              alt="post-thumbnail"
            />
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postSummary}>{post.desc}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
