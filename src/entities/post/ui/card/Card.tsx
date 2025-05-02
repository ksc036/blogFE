import PostUserProfile from "@/entities/user/ui/PostUserProfile";
import styles from "./Card.module.css";
import { CardType, Post } from "@/entities/post/model/types";
import PostLike from "../PostLike/PostLike";
import Link from "next/link";
export default function Card({ post }: { post: Post }) {
  // console.log("Card", post);
  return (
    <Link href={`/posts/${post.id}`}>
      <div className={styles.card}>
        <div
          style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}
          className={styles.thumbnail}
        >
          <img
            className={styles.img}
            src={
              post.thumbnailUrl
                ? post.thumbnailUrl
                : "https://minio.ksc036.store/log404default/default-thumbnail.png"
            }
            alt=""
          />
        </div>

        <div className={styles.main}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.content}>{post.desc}</div>
          <div className={styles.date}>{post.createdAt}</div>
        </div>
        <div className={styles.info}>
          <PostUserProfile user={post.user}></PostUserProfile>
          <PostLike></PostLike>
        </div>
      </div>
    </Link>
  );
}
