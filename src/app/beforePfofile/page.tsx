import CardList from "@/widgets/postList/ui/UserProfilePostList/CardList";
import styles from "./page.module.css";
import { Post } from "@/entities/post/model/types";
import { urlParams } from "@/shared/types/types";
import { getPostsBySubdomain } from "@/entities/post/api/postApi";
import { getPosts } from "@/entities/post/api/getPosts";
import Image from "next/image";

export default async function ProfilePage({ params }: urlParams) {
  const { id, subdomain } = await params;
  const testUser: Me = {
    id: 3,
    name: "홍길동",
    email: "hong@example.com",
    subdomain: "gildong",
    bio: "기록을 사랑하는 개발자입니다.",
    blogName: "길동 블로그",
    thumbnailUrl:
      "https://minio.ksc036.store/delog/uploads/1746009561156_ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%2030%EC%9D%BC%20%EC%98%A4%ED%9B%84%2007_39_17.png",
  };
  console.log("ProfilePage", subdomain);
  // console.log("hostname", window.location.hostname);
  // const posts: Post[] = await getPostsBySubdomain(subdomain); //params.id로 바꿔야함
  const posts: Post[] = await getPosts(); //params.id로 바꿔야함
  console.log("posts", posts);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <div className={styles.profile}>
            <Image
              src={
                testUser.thumbnailUrl ??
                "https://minio.ksc036.store/delog/uploads/1746009561156_ChatGPT%20Image%202025%EB%85%84%204%EC%9B%94%2030%EC%9D%BC%20%EC%98%A4%ED%9B%84%2007_39_17.png"
              }
              alt="프로필 이미지"
              width={40}
              height={40}
              priority // ✅ 로딩 지연 해결
              className={styles.profileImage}
            />
            {testUser.name}님의 프로필입니다.
          </div>
          <div className={styles.tag}>태그들</div>
        </div>
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
