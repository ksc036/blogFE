import styles from "./Card.module.css";
export default function Card({
  id,
  title,
  content,
  desc,
}: {
  id: number;
  title: string;
  content: string;
  desc: string;
}) {
  return (
    <a href={`/posts/${id}`}>
      <div className={styles.card}>
        <img className={styles.img} src="" alt="" />
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
