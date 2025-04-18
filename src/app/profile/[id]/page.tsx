import CardList from "@/components/server/profilePostList/CardList";
import styles from "./page.module.css";
interface Props {
  params: { id: string }; // 이게 핵심
}
export default function ProfilePage({ params }: Props) {
  const posts = [
    { id: 1, title: "제목1", content: "내용1" },
    { id: 2, title: "제목2", content: "내용2" },
    { id: 3, title: "제목3", content: "내용3" },
    { id: 4, title: "제목3", content: "내용3" },
    { id: 5, title: "제목3", content: "내용3" },
    { id: 6, title: "제목3", content: "내용3" },
    { id: 7, title: "제목3", content: "내용3" },
    { id: 8, title: "제목3", content: "내용3" },
    { id: 9, title: "제목3", content: "내용3" },
    { id: 10, title: "제목3", content: "내용3" },
    { id: 11, title: "제목3", content: "내용3" },
    { id: 12, title: "제목3", content: "내용3" },
    { id: 13, title: "제목3", content: "내용3" },
    { id: 14, title: "제목3", content: "내용3" },
    { id: 15, title: "제목3", content: "내용3" },
    { id: 16, title: "제목3", content: "내용3" },
    { id: 17, title: "제목3", content: "내용3" },
    { id: 18, title: "제목3", content: "내용3" },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <div className={styles.profile}>{params.id}님의 프로필입니다.</div>
          <div className={styles.tag}>태그들</div>
        </div>
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
