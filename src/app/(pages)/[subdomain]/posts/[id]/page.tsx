import styles from "./page.module.css";
import { urlParams } from "@/shared/types/types";
import { getPostsById } from "@/entities/post/api/getPostsById";
import { getPosts } from "@/entities/post/api/getPosts";

import CardList from "@/widgets/postList/ui/PostList/CardList";
import PostMarkDownContent from "@/entities/post/ui/postContent/PostMarkDownContent";
import PostDeleteButton from "@/features/post/ui/PostDeleteButton";
import CommentArea from "@/widgets/CommentForPost/ui/CommentArea";
import PostEditButton from "@/features/post/ui/PostEditButton";

export default async function postPage({ params }: urlParams) {
  const { subdomain, id } = await params;
  console.log("subdomain", subdomain);
  const post = await getPostsById(Number(id));
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{post.title} </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <PostDeleteButton postId={id}></PostDeleteButton>
        <PostEditButton postId={id}></PostEditButton>
      </div>
      <div className={styles.content}>
        <PostMarkDownContent content={post.content}></PostMarkDownContent>
      </div>

      <div className={styles.contentend}>
        <div className={styles.profile}>프로필</div>
        <div className={styles.button}>좋아요 | 스크랩</div>
      </div>

      <CommentArea postId={post.id} comments={post.comments}></CommentArea>
      <div className={styles.advertise}>
        <div
          style={{
            fontSize: "18px",
            color: "#999999",
            textAlign: "center",
            padding: "10px 0",
          }}
        >
          이런 게시글은 어때요?
        </div>
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
