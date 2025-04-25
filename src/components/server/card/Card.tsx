import styles from "./Card.module.css";
export default function Card({
  id,
  title,
  content,
  desc,
  thumbnailUrl,
}: {
  id: number;
  title: string;
  content: string;
  desc: string;
  thumbnailUrl: string;
}) {
  return (
    <a href={`/posts/${id}`}>
      <div className={styles.card}>
        <div
          style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}
          className={styles.thumbnail}
        >
          <img className={styles.img} src={thumbnailUrl} alt="" />
        </div>

        <div className={styles.main}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{desc}</div>
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
