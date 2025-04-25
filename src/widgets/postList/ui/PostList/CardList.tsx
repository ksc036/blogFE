import { Post } from "@/entities/post/model/types";
import styles from "./CardList.module.css";
import Card from "@/entities/post/ui/card/Card";
interface Props {
  posts: Post[];
}
export default function CardList({ posts }: { posts: Props }) {
  return (
    <div className={styles.cardList}>
      {posts.map((post: Post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}
