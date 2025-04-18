import styles from "./page.module.css";
import CardList from "@/components/server/cardList/CardList";
import { getPosts } from "@/api/post";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { set } from "@/store/slices/userSlice";

export default async function Home() {
  // const posts = await getPosts();
  const posts = [
    { id: 1, title: "제목1", content: "내용1" },
    { id: 2, title: "제목2", content: "내용2" },
    { id: 3, title: "제목3", content: "내용3" },
  ];
  // const id = useAppSelector((state) => state.user.id);
  // const dispatch = useAppDispatch();
  return (
    <div className={styles.page}>
      <CardList posts={posts}></CardList>
    </div>
  );
}
