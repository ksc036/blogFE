import styles from "./page.module.css";
import CardList from "@/components/server/cardList/CardList";
// import { getPosts } from "@/api/post";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { set } from "@/store/slices/userSlice";

export default async function Home() {
  // const posts = await getPosts();
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
  // const id = useAppSelector((state) => state.user.id);
  // const dispatch = useAppDispatch();
  return (
    <div className={styles.page}>
      <CardList posts={posts}></CardList>
    </div>
  );
}
