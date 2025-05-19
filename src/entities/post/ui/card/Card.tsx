import PostUserProfile from "@/entities/user/ui/PostUserProfile";
import styles from "./Card.module.css";
import { CardType, Post } from "@/entities/post/model/types";
import PostLike from "@/entities/post/ui/postLike_tmp/PostLike";
import Link from "next/link";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
export default function Card({ post }: { post: Post }) {
  console.log("Card", post);
  return (
    <div className={styles.card}>
      <Link
        href={`https://${post?.user?.subdomain}.ksc036.store/posts/${post.postUrl}`}
      >
        {/* <Link href={`/posts/${post.id}`}> */}
        <div>
          <div className={styles.thumbnail}>
            <img
              className={styles.img}
              src={
                post.thumbnailUrl
                  ? post.thumbnailUrl
                  : "/images/common/default-thumbnail.png"
              }
              alt=""
            />
          </div>

          <div className={styles.main}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.content}>{post.desc}</div>
          </div>
          <div className={styles.info}>
            <div className={styles.date}>
              {formatToKoreanDate(post.createdAt)}
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.cardFooter}>
        <PostUserProfile user={post.user}></PostUserProfile>
        <PostLike
          likeCnt={post._count?.likes ?? 0}
          commentCnt={post.commentCount ?? 0}
        ></PostLike>
      </div>
    </div>
  );
}
