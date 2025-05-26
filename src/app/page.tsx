import HomePostList from "@/widgets/HomePostList/HomePostList";
import { getPosts } from "@/entities/post/api";
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div style={{ paddingTop: "20px" }}>
      <HomePostList posts={posts}></HomePostList>
    </div>
  );
}
