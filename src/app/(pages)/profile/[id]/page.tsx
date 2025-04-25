// import CardList from "@/components/server/profilePostList/CardList";
// import CardList from "@/widgets/postList/ui/CardList";
import CardList from "@/widgets/postList/ui/UserProfilePostList/CardList";
import styles from "./page.module.css";
import { getPosts } from "@/entities/post/api/getPosts"; //이후에 userPost에 대한건 widget의 modle에 넣자.
import { Post } from "@/entities/post/model/types";
import { urlParams } from "@/shared/types/types";
// interface Props {
//   params: Promise<{ id: string }>;
// }
export default async function ProfilePage({ params }: urlParams) {
  const posts: Post[] = await getPosts();
  const { id } = await params;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <div className={styles.profile}>${id}님의 프로필입니다.</div>
          <div className={styles.tag}>태그들</div>
        </div>
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
