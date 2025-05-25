import { Post } from "../../../../entities/post/types";
import styles from "./CardList.module.css";
import Card from "@/features/post/card/Card";
interface Props {
  posts: Post[];
}

export default function CardList({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.cardList}>
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}
