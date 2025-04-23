import CardList from "@/components/server/cardList/CardList";
import Comments from "@/components/client/comments/Comments";
import PostEdit from "@/components/client/postEdit/PostEdit";
import PostDelete from "@/components/client/postDelete/PostDelete";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import axiosInstance from "@/lib/axiosInstance";
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function postPage({ params }: PageProps) {
  const posts = [
    { id: 1, title: "제목1", content: "내용1" },
    { id: 2, title: "제목2", content: "내용2" },
    { id: 3, title: "제목3", content: "내용3" },
    { id: 4, title: "제목3", content: "내용3" },
    { id: 5, title: "제목3", content: "내용3" },
    { id: 6, title: "제목3", content: "내용3" },
    { id: 7, title: "제목3", content: "내용3" },
    { id: 8, title: "제목3", content: "내용3" },
    { id: 9, title: "제목3", content: "내용3" },
    { id: 10, title: "제목3", content: "내용3" },
    { id: 11, title: "제목3", content: "내용3" },
    { id: 12, title: "제목3", content: "내용3" },
    { id: 13, title: "제목3", content: "내용3" },
    { id: 14, title: "제목3", content: "내용3" },
    { id: 15, title: "제목3", content: "내용3" },
    { id: 16, title: "제목3", content: "내용3" },
    { id: 17, title: "제목3", content: "내용3" },
    { id: 18, title: "제목3", content: "내용3" },
  ];
  const { id } = await params;
  const res = await axiosInstance(`/posts/${id}`);
  const post = res.data;
  console.log(post);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{post.title} </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <PostEdit postId={id}></PostEdit>
        <div>
          <PostDelete postId={id} />
        </div>
      </div>
      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className={styles.contentend}>
        <div className={styles.profile}>프로필</div>
        <div className={styles.button}>좋아요 | 스크랩</div>
      </div>
      <Comments postId={post.id} comments={post.comments}></Comments>
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
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
