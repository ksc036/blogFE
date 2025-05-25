import styles from "./page.module.css";
import CardList from "@/widgets/postList/ui/PostList/CardList";
import { getPosts } from "@/entities/post/api";
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className={styles.page}>
      <CardList posts={posts}></CardList>
    </div>
  );
}
