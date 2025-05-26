"use client";
import { Post } from "@/entities/post/types";
import styles from "./HomePostList.module.css";
import Card from "@/features/post/card/Card";
import { useEffect, useRef, useState } from "react";
import { getPosts } from "@/entities/post/api";
interface Props {
  initialPost: Post[];
  totalPostLength: number; // 전체 게시글 수
}
export default function HomePostList({ initialPost, totalPostLength }: Props) {
  const [posts, setPosts] = useState(initialPost);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(totalPostLength > posts.length);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        loadNextPage();
      }
    });

    if (observerRef.current) observer.current.observe(observerRef.current);
  }, [posts, loading, hasMore]);
  const loadNextPage = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const res = await getPosts(nextPage); // 페이지를 넘겨줘야 정확
    // setPosts((prev) => {
    //   const updatedPosts = [...prev, ...res.posts];
    //   setHasMore(updatedPosts.length < totalPostLength);
    //   return updatedPosts;
    // });
    // setPage(nextPage);
    // setLoading(false);
    setTimeout(() => {
      setPosts((prev) => {
        const updatedPosts = [...prev, ...res.posts];
        setHasMore(updatedPosts.length < totalPostLength);
        return updatedPosts;
      });
      setPage(nextPage);
      setLoading(false);
    }, 1000); // ✅ 1초 지연
  };
  return (
    <div>
      <div className={styles.cardList}>
        {posts.map((post: Post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>

      <div ref={observerRef} style={{ height: "1px" }} />

      {loading && (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>불러오는 중...</p>
        </div>
      )}

      {!hasMore && (
        <div className={styles.endMessage}>
          <span className={styles.checkIcon}>✅</span>
          <span>더 이상 게시글이 없어요! 🎉</span>
        </div>
      )}
    </div>
  );
}
