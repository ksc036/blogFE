import styles from "./CardList.module.css";
import Card from "@/components/server/card/Card";
type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
};

export default function CardList({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.cardList}>
      {posts.map((post) => (
        <Card key={post.id} {...post} />
      ))}
    </div>
  );
}
