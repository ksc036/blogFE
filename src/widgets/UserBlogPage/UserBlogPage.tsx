// import axiosInstance from "@/shared/lib/axiosInstance";
import styles from "./UserBlogPage.module.css";
import BlogProfile from "@/features/user/blogProfile/BlogProfile";
import { urlParams } from "@/shared/types";
import { getUserBlogData } from "@/widgets/UserBlogPage/model";
import UserBlogPageTagWithPosts from "@/widgets/UserBlogPage/ui/UserBlogPageTagWithPosts";
export const dynamic = "force-dynamic";

export default async function UserBlogPage({ params }: urlParams) {
  const { subdomain } = await params;
  try {
    const data = await getUserBlogData(subdomain);
    return (
      <main className={styles.container}>
        <section className={styles.profileSection}>
          <BlogProfile
            user={data.user}
            isSubscribed={data.user.isSubscribed}
          ></BlogProfile>
        </section>
        <UserBlogPageTagWithPosts
          data={data}
          subdomain={subdomain}
        ></UserBlogPageTagWithPosts>
      </main>
    );
  } catch (err: any) {
    console.error("Error fetching user blog page:", err);
    return <div>알 수 없는 오류가 발생했습니다.</div>;
  }
}
