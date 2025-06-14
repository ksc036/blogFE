import { Post } from "@/entities/post/types";
import { useState } from "react";
import PostMarkDownContent from "@/features/post/postContent/PostMarkDownContent";
import { statusToEmoji } from "@/shared/lib/statusToEmoji";
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
export default function ReviewStatusContent({ data }: { data: reviewData[] }) {
  const [selectedPost, setSelectedPost] = useState<reviewData | null>(null);

  const handlePostClick = (post: reviewData) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };
  return (
    <div>
      <h2>Review Posts</h2>
      <div>
        {data.map((postData) => (
          <div
            key={postData.postId}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => handlePostClick(postData)}
          >
            <h3>{postData.post.title}</h3>
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
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              // maxWidth: "500px",
              width: "100%",
              minWidth: "300px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            <h2>{selectedPost.post.title}</h2>
            <PostMarkDownContent
              content={selectedPost.post.content}
            ></PostMarkDownContent>
            {/* <p>{selectedPost.post.content}</p> */}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
