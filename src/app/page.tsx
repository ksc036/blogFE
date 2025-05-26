import HomePostList from "@/widgets/HomePostList/HomePostList";
import { getPosts } from "@/entities/post/api";
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPosts(1);
  console.log("init data :::::::", data);
  return (
    <div style={{ paddingTop: "20px" }}>
      <HomePostList
        initialPost={data.posts}
        totalPostLength={data.totalPostLength}
      ></HomePostList>
    </div>
  );
}
