"use client";

import { Post } from "@/entities/post/types";
import Link from "next/link";
import styles from "./UserBlogPagePostList.module.css";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
import TagList from "../TagList/TagList";
import PostLike from "../postLike/PostLike";

export default function UserBlogPagePostList({
  posts,
}: {
  posts: Post[];
  postLength: number;
  page: number;
}) {
  console.log("UserBlogPagePostList posts:", posts);

  // const [posts, setPosts] = useState(posts);
  // const [page, setPage] = useState(1);
  // // const [loading, setLoading] = useState(false);
  // const [postLength, setPostLength] = useState(initPostLength);
  // const totalPages = Math.ceil(postLength / POSTS_PER_PAGE);
  // const loadPage = async (pageNumber: number) => {
  //   if (pageNumber === page) return;
  //   // setLoading(true);
  //   const data = await getUserBlogData(subdomain, pageNumber);
  //   setPosts(data.posts);
  //   setPage(pageNumber);
  //   setPostLength(data.postLength);
  //   // setLoading(false);
  //   requestAnimationFrame(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   });
  // };
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
    </section>
  );
}
