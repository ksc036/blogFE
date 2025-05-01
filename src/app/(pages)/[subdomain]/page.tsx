"use client";

import axiosInstance from "@/shared/lib/axiosInstance";
import styles from "./BlogPage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogPage({ params }) {
  //postsList & userInfo 받아오기
  const { subdomain } = params;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`users/blogProfile/${subdomain}`);
      console.log("res ", res.data);
      setData(res.data);
    };
    fetchData();
  }, []);

  //   const posts = [
  //     {
  //       id: 1,
  //       title: "포스트 1",
  //       desc: "내용은 이것이다..... ",
  //       thumbnailUrl:
  //         "https://minio.ksc036.store/delog/uploads/1746009561156_ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%2030%EC%9D%BC%20%EC%98%A4%ED%9B%84%2007_39_17.png",
  //       userId: 1,
  //       subdomain: "ksc036",
  //     },
  //     {
  //       id: 2,
  //       title: "포스트 2",
  //       desc: "내용은 이것이다..... ",
  //       thumbnailUrl: "/images/thumb2.jpg",
  //       userId: 1,
  //       subdomain: "ksc036",
  //     },
  //     {
  //       id: 3,
  //       title: "포스트 3",
  //       desc: "내용은 이것이다..... ",
  //       thumbnailUrl: "/images/thumb3.jpg",
  //       userId: 1,
  //       subdomain: "ksc036",
  //     },
  //   ];

  return (
    <main className={styles.container}>
      {/* 로딩 중 처리 */}
      {!data ? (
        <div>로딩 중...</div>
      ) : (
        <>
          {/* 프로필 섹션 */}
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
        </>
      )}
    </main>
  );
}
