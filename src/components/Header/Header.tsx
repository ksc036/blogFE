import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.mainHeader}>
        <div>Delog logo</div>
        <div>profile</div>
      </div>
      <div className={styles.mainHeader}>
        <div>트랜딩 | 최신 | 피드 </div>
        <div>이번주</div>
      </div>
    </header>
  );
}
