import styles from "./page.module.css";
import CardList from "@/widgets/postList/ui/PostList/CardList";
import { getPosts } from "@/entities/post/api/getPosts";

export default async function Home() {
  console.log("Home page init");
  const posts = await getPosts();
  console.log("home posts list ", posts);
  return (
    <div className={styles.page}>
      <CardList posts={posts}></CardList>
    </div>
  );
}
