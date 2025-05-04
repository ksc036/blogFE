import { Me } from "../../model/types";
import styles from "./BlogProfile.module.css";
import Link from "next/link";
import SubscribeButton from "@/entities/user/ui/blogProfile/BlogProfile";
export default function BlogProfile({ user }: { user: Me }) {
  if (!user) {
    // 로딩 중이거나 데이터가 없는 경우
    return <div>Loading...</div>; // 또는 Skeleton 컴포넌트 등
  }
  return (
    <div className={styles.meta}>
      <div className={styles.profile}>
        <Link href={`https://${user.subdomain}.ksc036.store`}>
          <img
            src={
              user.thumbnailUrl ||
              "https://minio.ksc036.storehttps://minio.ksc036.store/log404default/default-profile.png"
            }
            alt="User profile"
            className={styles.avatar}
            width={128}
            height={128}
          />
        </Link>
        <div className={styles.blogInfo}>
          <Link href={`https://${user.subdomain}.ksc036.store`}>
            <h2 className={styles.blogName}>{user.blogName}</h2>
          </Link>
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </div>
      <SubscribeButton
        isSubscribed={user.isSubscribed}
        userId={user.id}
      ></SubscribeButton>
      {/* <div className={styles.subscribeButton}>+ 구독</div> */}
    </div>
  );
}
