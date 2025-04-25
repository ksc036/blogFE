import styles from "./Card.module.css";
import { CardType, Post } from "@/entities/post/model/types";
export default function Card({ post }: { post: Post }) {
  console.log("Card", post);
  return (
    <a href={`/posts/${post.id}`}>
      <div className={styles.card}>
        <div
          style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}
          className={styles.thumbnail}
        >
          <img className={styles.img} src={post.thumbnailUrl} alt="" />
        </div>

        <div className={styles.main}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.content}>{post.desc}</div>
          <div className={styles.date}>2025.04.18</div>
        </div>
        <div className={styles.info}>
          <div>miniProfile</div>
          <div>like</div>
        </div>
      </div>
    </a>
  );
}
