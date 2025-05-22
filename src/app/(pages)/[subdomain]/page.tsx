// import axiosInstance from "@/shared/lib/axiosInstance";
import { createServerAxios } from "@/shared/lib/axiosInstnaceServer";
import styles from "./BlogPage.module.css";
import Link from "next/link";
import BlogProfile from "@/entities/user/ui/blogProfile/BlogProfile";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import PostLike from "@/entities/post/ui/postLike_tmp/PostLike";
import { urlParams } from "@/shared/types/types";
import { Post } from "@/entities/post/model/types";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export default async function BlogPage({ params }: urlParams) {
  const { subdomain } = await params;
  const cookieStore = cookies();
  const cookie = cookieStore.toString();
  const axiosServerInstance = createServerAxios(cookie);
  const res = await axiosServerInstance.get(`/users/blogProfile/${subdomain}`);
  const data = res.data;
  if (!data) {
    return <div>사용자없음</div>;
  }
  return (
    <main className={styles.container}>
      <section className={styles.profileSection}>
        {/* <BlogProfile user={data.user}></BlogProfile> */}
        <BlogProfile
          user={data.user}
          isSubscribed={data.isSubscribed}
        ></BlogProfile>
      </section>

      {/* 포스트 목록 */}
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

                {/* <img
                  src={
                    post.thumbnailUrl
                      ? post.thumbnailUrl
                      : "/images/common/default-thumbnail.png"
                  }
                  className={styles.thumbnail}
                  alt="post-thumbnail"
                /> */}
              </div>

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
    </main>
  );
}
