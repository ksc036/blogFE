import CardList from "@/widgets/postList/ui/UserProfilePostList/CardList";
import styles from "./page.module.css";
import { Post } from "@/entities/post/model/types";
import { urlParams } from "@/shared/types/types";
import { getPostsBySubdomain } from "@/entities/post/api/postApi";

export default async function ProfilePage({ params }: urlParams) {
  const { id, subdomain } = await params;
  console.log("ProfilePage", subdomain);
  // console.log("hostname", window.location.hostname);
  const posts: Post[] = await getPostsBySubdomain(subdomain); //params.id로 바꿔야함

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <div className={styles.profile}>${subdomain}님의 프로필입니다.</div>
          <div className={styles.tag}>태그들</div>
        </div>
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
