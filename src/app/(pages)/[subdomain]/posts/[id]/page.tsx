import styles from "./page.module.css";
import { urlParams } from "@/shared/types/types";
import { getPosts } from "@/entities/post/api/getPosts";

import CardList from "@/widgets/postList/ui/PostList/CardList";
import PostMarkDownContent from "@/entities/post/ui/postContent/PostMarkDownContent";
import PostEditForm from "@/features/post/ui/PostEditForm";
import CommentArea from "@/widgets/CommentForPost/ui/CommentArea";
import BlogProfile from "@/entities/user/ui/blogProfile/BlogProfile";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import Link from "next/link";
import PostActionBar from "@/entities/post/ui/postActionBar/PostActionBar";
import { getPostsBySubdomainWithId } from "@/entities/post/api/getPostsByIdWithSubdomainServer";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createServerAxios } from "@/shared/lib/axiosInstnaceServer";

export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: urlParams): Promise<Metadata> {
  const { subdomain, id } = await params;
  const cookieStore = cookies();
  const cookie = cookieStore.toString();
  const axiosServerInstance = createServerAxios(cookie);
  const res = await axiosServerInstance.get(`/posts/${subdomain}/${id}`);
  const post = res.data;
  // const post = await getPostsBySubdomainWithId(subdomain, id);
  return {
    title: post.title,
    description: post.desc,
    openGraph: {
      type: "article",
      url: `https://${post.user.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/${post.postUrl}`,
      title: post.title,
      description: post.desc,
      images: [
        {
          url:
            post.thumbnailUrl ??
            `https://${process.env.NEXT_PUBLIC_DOMAIN}/images/common/default-thumbnail.png`,
        },
      ],
    },
  };
}

export default async function postPage({ params }: urlParams) {
  const { subdomain, id } = await params;
  const cookieStore = cookies();
  const cookie = cookieStore.toString();
  const axiosServerInstance = createServerAxios(cookie);
  const res = await axiosServerInstance.get(`/posts/${subdomain}/${id}`);
  const post = res.data;
  // const post = await getPostsBySubdomainWithId(subdomain, id);
  const posts = await getPosts();

  return (
    <>
      <main>
        {" "}
        <div>
          <div className={styles.container}>
            <h1 className={styles.title}>{post.title} </h1>
            <div className={styles.userInfoWrap}>
              <div className={styles.userInfo}>
                <span className={styles.name}>
                  by{" "}
                  <Link
                    href={`https://${post.user.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
                  >
                    {post.user.name}
                  </Link>
                </span>
                <span className={styles.dot}>·</span>
                {formatToKoreanDate(post.createdAt)}
              </div>
              <div className={styles.editForm}>
                <PostEditForm
                  postUserId={post.userId}
                  postId={post.id}
                ></PostEditForm>
              </div>
            </div>
            <div className={styles.content}>
              <PostMarkDownContent content={post.content}></PostMarkDownContent>
            </div>
            <PostActionBar
              isLiked={post.isLiked}
              likeCount={post._count.likes}
              postId={post.id}
              post={post}
            ></PostActionBar>
            <div className={styles.profile}>
              <BlogProfile
                user={post.user}
                isSubscribed={post.isSubscribed}
              ></BlogProfile>
            </div>
            <CommentArea
              postId={post.id}
              comments={post.comments}
            ></CommentArea>
            <div className={styles.advertise}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#999999",
                  textAlign: "center",
                  padding: "10px 0",
                }}
              >
                이런 게시글은 어때요?
              </div>
            </div>
          </div>
          <CardList posts={posts}></CardList>
        </div>
      </main>
    </>
  );
}
