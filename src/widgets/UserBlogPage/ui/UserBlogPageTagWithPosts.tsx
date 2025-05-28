"use client";

import UserBlogPagePostList from "@/features/post/UserBlogPagePostList/UserBlogPagePostList";
import TagList from "@/features/tag/TagList";
import { useState } from "react";
import { getUserBlogData, getUserBlogDataWithTag } from "../model";
import PageButton from "@/features/post/pageButton/pageButton";

export default function UserBlogPageTagWithPosts({
  data,
  subdomain,
}: {
  data: any;
  subdomain: string;
}) {
  // console.log("data in UserBlogPageTagWithPosts", data);
  const [posts, setPosts] = useState(data.posts);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [postLength, setPostLength] = useState(data.postLength);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const userId = data.user.id;
  // const userSubdomain = data.user.subdomain;

  const loadPage = async (pageNumber: number) => {
    if (pageNumber === page) return;
    // setLoading(true);
    // const data = await getUserBlogData(subdomain, pageNumber);
    const data = await getUserBlogDataWithTag(userId, pageNumber, selectedIds);
    setPageData(data.posts, pageNumber, data.totalCount);
    setSelectedIds(selectedIds);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };
  function setPageData(posts: any, page: number, postLength: number) {
    setPosts(posts);
    setPage(page);
    setPostLength(postLength);
  }
  const handleTagChange = async (ids: any) => {
    const data = await getUserBlogDataWithTag(userId, 1, ids);
    setSelectedIds(ids);
    setPageData(data.posts, 1, data.totalCount);
    // setSelectedIds(ids);
    // 여기서 필터링된 게시글 요청 로직 실행해도 됨
  };
  return (
    <div>
      <div>
        <TagList
          tagList={data.tagList}
          onChange={handleTagChange}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        ></TagList>
      </div>
      <UserBlogPagePostList
        posts={posts}
        userSubdomain={subdomain}
      ></UserBlogPagePostList>
      <PageButton
        postLength={postLength}
        page={page}
        loadPage={loadPage}
      ></PageButton>
    </div>
  );
}
