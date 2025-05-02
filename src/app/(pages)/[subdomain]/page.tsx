import axiosInstance from "@/shared/lib/axiosInstance";
import styles from "./BlogPage.module.css";
import Image from "next/image";
import Link from "next/link";
import BlogProfile from "@/entities/user/ui/blogProfile/BlogProfile";

export default async function BlogPage({ params }) {
  const { subdomain } = await params;
  const res = await axiosInstance.get(`users/blogProfile/${subdomain}`);
  const data = res.data;
  console.log(data);
  if (!data) {
    return <div>사용자없음</div>;
  }
  return (
    <main className={styles.container}>
      <section className={styles.profileSection}>
        <BlogProfile user={data.user}></BlogProfile>
        {/* <Image
          src={data.user.thumbnailUrl}
          alt="User profile"
          width={80}
          height={80}
          className={styles.avatar}
        />
        <div className={styles.profileInfo}>
          <h2 className={styles.name}>{data.user.blogName}</h2>
          <p className={styles.bio}>{data.user.bio}</p>
        </div> */}
      </section>

      {/* 포스트 목록 */}
      <section className={styles.postList}>
        {data.posts.map((post) => (
          <Link
            href={`https://${post.user.subdomain}.ksc036.store/posts/${[
              post.id,
            ]}`}
          >
            <article key={post.id} className={styles.postCard}>
              <img
                src={
                  post.thumbnailUrl
                    ? post.thumbnailUrl
                    : "https://minio.ksc036.store/log404default/default-thumbnail.png"
                }
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
          </Link>
        ))}
      </section>
    </main>
  );
}
