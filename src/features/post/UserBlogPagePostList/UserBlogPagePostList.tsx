"use client";

import { Post } from "@/entities/post/types";
import Link from "next/link";
import styles from "./UserBlogPagePostList.module.css";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
import TagList from "../TagList/TagList";
import PostLike from "../postLike/PostLike";
import { useState } from "react";
import { getUserBlogData } from "@/widgets/UserBlogPage/model";

export default function UserBlogPagePostList({
  data,
  subdomain,
  postLength,
}: {
  data: Post[];
  subdomain: string;
  postLength: number;
}) {
  console.log("UserBlogPagePostList data:", data);
  const POSTS_PER_PAGE = 10;
  const [posts, setPosts] = useState(data);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(postLength / POSTS_PER_PAGE);
  const loadPage = async (pageNumber: number) => {
    if (pageNumber === page) return;
    setLoading(true);
    const data = await getUserBlogData(subdomain, pageNumber);
    setPosts(data.posts);
    setPage(pageNumber);
    setLoading(false);
  };
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    console.log("totalPages:", totalPages);
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };
  return (
    <section className={styles.postList}>
      {posts.map((post: Post) => (
        <Link
          key={post.id}
          href={`https://${post?.user?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/posts/${post.postUrl}`}
        >
          <article className={styles.postCard}>
            <div className={styles.postContent}>
              <div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postSummary}>{post.desc}</p>
              </div>
              <div className={styles.thumbnailWrapper}>
                <img
                  src={
                    post.thumbnailUrl
                      ? post.thumbnailUrl
                      : "/images/common/default-thumbnail.png"
                  }
                  className={
                    !post.visibility
                      ? styles.hiddenThumbnail
                      : styles.normalThumbnail
                  }
                  alt="post-thumbnail"
                />
                {!post.visibility && (
                  <div className={styles.overlay}>
                    <img
                      src="/icons/lock.png"
                      alt="잠금"
                      className={styles.lockIcon}
                    />
                  </div>
                )}
              </div>
            </div>
            <TagList tagList={tagToArray(post?.postTags)}></TagList>
            <div className={styles.extraInfo}>
              <div className={styles.date}>
                {formatToKoreanDate(post.createdAt)}
              </div>

              <PostLike
                likeCnt={post._count?.likes ?? 0}
                commentCnt={post.commentCount ?? 0}
              ></PostLike>
            </div>
          </article>
        </Link>
      ))}

      <div className={styles.pagination}>
        {generatePageNumbers().map((p, idx) =>
          typeof p === "string" ? (
            <span key={idx} className={styles.dots}>
              {p}
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => loadPage(p)}
              className={p === page ? styles.activePage : styles.pageButton}
              disabled={p === page}
            >
              {p}
            </button>
          )
        )}
      </div>
    </section>
  );
}
