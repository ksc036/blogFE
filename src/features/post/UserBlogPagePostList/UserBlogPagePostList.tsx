"use client";

import { Post } from "@/entities/post/types";
import Link from "next/link";
import styles from "./UserBlogPagePostList.module.css";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
import TagList from "../TagList/TagList";
import PostLike from "../postLike/PostLike";

export default function UserBlogPagePostList({
  data,
}: {
  data: { posts: Post[] };
}) {
  return (
    <section className={styles.postList}>
      {data.posts.map((post: Post) => (
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
    </section>
  );
}
