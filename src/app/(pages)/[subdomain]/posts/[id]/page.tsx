import styles from "./page.module.css";
import { urlParams } from "@/shared/types";
import { getPosts } from "@/entities/post/api";
import HomePostList from "@/widgets/HomePostList/HomePostList";
import PostMarkDownContent from "@/features/post/postContent/PostMarkDownContent";
import PostEditForm from "@/features/post/PostEditForm/PostEditForm";
import CommentArea from "@/widgets/CommentForPost/ui/CommentArea";
import BlogProfile from "@/features/user/blogProfile/BlogProfile";
import { formatToKoreanDate } from "@/shared/lib/date/formatData";
import Link from "next/link";
import PostActionBar from "@/features/post/postActionBar/PostActionBar";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createServerAxios } from "@/shared/lib/axiosInstnaceServer";
import TagList from "@/features/post/TagList/TagList";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: urlParams): Promise<Metadata> {
  const { subdomain, id } = await params;
  const cookieStore = cookies();
  const cookie = cookieStore.toString();
  const axiosServerInstance = createServerAxios(cookie);

  try {
    const res = await axiosServerInstance.get(`/posts/${subdomain}/${id}`);
    const post = res.data;

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
  } catch (error) {
    notFound(); // 2. 게시글이 없는 경우 404 페이지로 이동
  }
}

export default async function postPage({ params }: urlParams) {
  const { subdomain, id } = await params;
  const cookieStore = cookies();
  const cookie = cookieStore.toString();
  const axiosServerInstance = createServerAxios(cookie);

  let postContent;
  let adPosts;
  try {
    const res = await axiosServerInstance.get(`/posts/${subdomain}/${id}`);
    postContent = res.data;

    const data = await getPosts(1);
    adPosts = data;
  } catch (error) {
    notFound(); // 3. 게시글이 없는 경우 404 페이지로 이동
  }
  return (
    <>
      <main>
        <div>
          <div className={styles.container}>
            <h1 className={styles.title}>{postContent.title} </h1>
            <div className={styles.userInfoWrap}>
              <div className={styles.userInfo}>
                <span className={styles.name}>
                  by{" "}
                  <Link
                    href={`https://${postContent.user.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`}
                  >
                    {postContent.user.name}
                  </Link>
                </span>
                <span className={styles.dot}>·</span>
                {formatToKoreanDate(postContent.createdAt)}
              </div>
              <div className={styles.editForm}>
                <PostEditForm
                  postUserId={postContent.userId}
                  postId={postContent.id}
                ></PostEditForm>
              </div>
            </div>
            <div className={styles.content}>
              <PostMarkDownContent
                content={postContent.content}
              ></PostMarkDownContent>
            </div>
            <TagList tagList={tagToArray(postContent.postTags)}></TagList>
            <PostActionBar
              isLiked={postContent.isLiked}
              likeCount={postContent._count.likes}
              postId={postContent.id}
              post={postContent}
            ></PostActionBar>
            <div className={styles.profile}>
              <BlogProfile
                user={postContent.user}
                isSubscribed={postContent.isSubscribed}
              ></BlogProfile>
            </div>
            <CommentArea
              postId={postContent.id}
              comments={postContent.comments}
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
          <HomePostList
            initialPost={adPosts.posts}
            totalPostLength={adPosts.totalPostLength}
          ></HomePostList>
        </div>
      </main>
    </>
  );
}
