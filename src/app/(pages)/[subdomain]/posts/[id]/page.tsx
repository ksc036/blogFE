import styles from "./page.module.css";
import { urlParams } from "@/shared/types/types";
import { getPostsById } from "@/entities/post/api/getPostsById";
import { getPosts } from "@/entities/post/api/getPosts";

import CardList from "@/widgets/postList/ui/PostList/CardList";
import PostMarkDownContent from "@/entities/post/ui/postContent/PostMarkDownContent";
import PostDeleteButton from "@/features/post/ui/PostDeleteButton";
import PostEditForm from "@/features/post/ui/PostEditForm";
import CommentArea from "@/widgets/CommentForPost/ui/CommentArea";
import PostEditButton from "@/features/post/ui/PostEditButton";
import { useAppSelector } from "@/shared/store/hooks";
import BlogProfile from "@/entities/user/ui/blogProfile/BlogProfile";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import Link from "next/link";

export default async function postPage({ params }: urlParams) {
  const { subdomain, id } = await params;
  console.log("subdomain", subdomain);
  const post = await getPostsById(Number(id));
  console.log("post", post);
  const posts = await getPosts();

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title} </h1>

        {/* <div className={styles.meta}>
          <div className={styles.profile}>
            <img
              src={post.user.thumbnailUrl || "/default-profile.png"}
              alt="작성자"
              className={styles.avatar}
            />
            <div className={styles.blogInfo}>
              <div className={styles.blogName}>{post.user.blogName}</div>
              <div>{post.user.bio}</div>
            </div>
          </div>
          <div className={styles.subscribeButton}>+ 구독</div>
        </div> */}
        {/* <div style={{ display: "flex", justifyContent: "end" }}>
            </div> */}
        <div className={styles.userInfoWrap}>
          <div className={styles.userInfo}>
            <span className={styles.name}>
              by{" "}
              <Link href={`https://${post.user.subdomain}.ksc036.store`}>
                {post.user.name}
              </Link>
            </span>
            <span className={styles.dot}>·</span>
            {formatToKoreanDate(post.createdAt)}
          </div>
          <div className={styles.editForm}>
            <PostEditForm
              postUserId={post.userId}
              postId={post.id}
            ></PostEditForm>
          </div>
        </div>
        <div className={styles.content}>
          <PostMarkDownContent content={post.content}></PostMarkDownContent>
        </div>
        <div className={styles.actionBar}>
          <button className={styles.likeButton}>♡ 0</button>
          <button className={styles.shareButton}>🔗 공유</button>
        </div>
        <BlogProfile user={post.user}></BlogProfile>

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
        </div>
      </div>
      <CardList posts={posts}></CardList>
    </div>
  );
}
