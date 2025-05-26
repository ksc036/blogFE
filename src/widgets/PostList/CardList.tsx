import { Post } from "@/entities/post/types";
import styles from "./CardList.module.css";
import Card from "@/features/post/card/Card";
interface Props {
  posts: Post[];
}
export default function CardList({ posts }: Props) {
  return (
    <div className={styles.cardList}>
      {posts.map((post: Post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}
