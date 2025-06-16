import { Post } from "@/entities/post/types";
import { useState } from "react";
import PostMarkDownContent from "@/features/post/postContent/PostMarkDownContent";
import { statusToEmoji } from "@/shared/lib/statusToEmoji";
import styles from "./ReviewStatusContent.module.css";
import axiosInstance from "@/shared/lib/axiosInstance";
import TagList from "@/features/post/TagList/TagList";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
type ReviewInstance = {
  id: number;
  status: "PENDING" | "DONE" | "MISSED";
  scheduledDate: string;
  reviewedAt: string | null;
};
type reviewData = {
  id: number;
  post: Post;
  postId: number;
  reviewInstances: ReviewInstance[];
};

// ReviewStatusContent.tsx
export default function ReviewStatusContent({
  data,
  setData,
}: {
  data: reviewData[];
  setData: (
    newState: reviewData[] | ((prevState: reviewData[]) => reviewData[])
  ) => void;
}) {
  const [selectedPost, setSelectedPost] = useState<reviewData | null>(null);

  const handlePostClick = (post: reviewData) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };
  return (
    <div>
      <h2>Review Posts Status</h2>
      <div>
        {data.map((postData) => (
          <div
            key={postData.postId}
            style={{
              border: "1px solid #ccc",
              padding: "10px 20px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => handlePostClick(postData)}
          >
            <div className={styles.postContainer}>
              <div className={styles.postInfo}>
                <div className={styles.postStatusRight}>
                  <h3>{postData.post.title}</h3>
                  <TagList
                    tagList={tagToArray(postData.post.postTags)}
                  ></TagList>
                </div>

                <div>
                  {postData?.reviewInstances
                    ?.sort(
                      (a, b) =>
                        new Date(a.scheduledDate).getTime() -
                        new Date(b.scheduledDate).getTime()
                    )
                    ?.map((instance) => (
                      <span key={instance.id} style={{ marginRight: "5px" }}>
                        {statusToEmoji(instance.status)}
                      </span>
                    ))}
                </div>
              </div>
              <div>
                <div
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      const res = await axiosInstance.delete(
                        "/posts/reviewInstance",
                        {
                          params: {
                            postId: postData.postId,
                          },
                        }
                      );
                      setData((prev) =>
                        prev.filter((item) => item.postId !== postData.postId)
                      );
                      console.log(res);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  ❌
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeModal}
        >
          <div
            className={styles.modalInside}
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            <h2>{selectedPost.post.title}</h2>
            <PostMarkDownContent
              content={selectedPost.post.content}
            ></PostMarkDownContent>
            {/* <p>{selectedPost.post.content}</p> */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
