import axiosInstance from "@/shared/lib/axiosInstance";
import styles from "./BlogPage.module.css";
import Image from "next/image";
import Link from "next/link";
import BlogProfile from "@/entities/user/ui/blogProfile/BlogProfile";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import PostLike from "@/entities/post/ui/postLike_tmp/PostLike";
import { urlParams } from "@/shared/types/types";
import { Post } from "@/entities/post/model/types";

export default async function BlogPage({ params }: urlParams) {
  const { subdomain } = await params;
  const res = await axiosInstance.get(`users/blogProfile/${subdomain}`);
  const data = res.data;
  console.log("data==", data);

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
            href={`https://${post?.user?.subdomain}.ksc036.store/posts/${post.postUrl}`}
            // href={`https://${post.user.subdomain}.ksc036.store/posts/${[
            //   post.id,
            // ]}`}
          >
            <article className={styles.postCard}>
              <div className={styles.postContent}>
                <div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postSummary}>{post.desc}</p>
                </div>
                <img
                  src={
                    post.thumbnailUrl
                      ? post.thumbnailUrl
                      : "https://minio.ksc036.store/log404default/default-thumbnail.png"
                  }
                  className={styles.thumbnail}
                  alt="post-thumbnail"
                />
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
