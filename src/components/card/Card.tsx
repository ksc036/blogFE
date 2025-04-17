import styles from "./Card.module.css";
export default function Header() {
  return (
    <div className={styles.card}>
      <img className={styles.ing} src="" alt="" />
      <div className={styles.main}>
        <div>제목</div>
        <div>내용</div>
        <div>작성일</div>
      </div>
      <div className={styles.profile}></div>
    </div>
  );
}
