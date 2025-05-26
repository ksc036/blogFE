import { Post } from "@/entities/post/types";
import styles from "./HomePostList.module.css";
import Card from "@/features/post/card/Card";
interface Props {
  posts: Post[];
}
export default function HomePostList({ posts }: Props) {
  return (
    <div className={styles.cardList}>
      {posts.map((post: Post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}
