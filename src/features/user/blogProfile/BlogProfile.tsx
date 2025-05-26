import styles from "./BlogProfile.module.css";
import Link from "next/link";
import SubscribeButton from "@/features/user/subscribeButton/SubscribeButton";
export default function BlogProfile({
  user,
  isSubscribed,
}: {
  user?: any;
  isSubscribed: boolean;
}) {
  console.log("user 출력 ", user);
  if (!user) {
    // 로딩 중이거나 데이터가 없는 경우
    return <div>Loading... {user?.id}</div>; // 또는 Skeleton 컴포넌트 등
  }
  return (
    <div className={styles.meta}>
      <div className={styles.profile}>
        <Link
          href={`https://${user.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
        >
          <img
            src={user.thumbnailUrl || "/images/common/default-profile.png"}
            alt="User profile"
            className={styles.avatar}
            width={128}
            height={128}
          />
        </Link>
        <div className={styles.blogInfo}>
          <Link
            href={`https://${user.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
          >
            <h2 className={styles.blogName}>{user.blogName}</h2>
          </Link>
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </div>
      <SubscribeButton
        isSubscribed={isSubscribed ?? false}
        userId={user.id}
      ></SubscribeButton>
    </div>
  );
}
