import Image from "next/image";
import { Me } from "../../model/types";
import styles from "./BlogProfile.module.css";
export default function BlogProfile({ user }: { user: Me }) {
  return (
    <div className={styles.meta}>
      <div className={styles.profile}>
        <Image
          src={user.thumbnailUrl || "/default-profile.png"}
          alt="User profile"
          className={styles.avatar}
          width={128}
          height={128}
        />
        <div className={styles.blogInfo}>
          <h2 className={styles.blogName}>{user.blogName}</h2>
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </div>
      <div className={styles.subscribeButton}>+ 구독</div>
    </div>
  );
}
