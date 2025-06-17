import { Post } from "@/entities/post/types";
import { useState } from "react";
import ReviewContentModal from "../ReviewContentModal/ReviewContentModal";
import { getDateDiffInDays } from "@/shared/lib/date/diff";
import { todayReviewData } from "../../ReviewPage";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
import TagList from "@/features/post/TagList/TagList";
import styles from "./TodayReviewContent.module.css";
// type todayReviewData = {
//   id: number;
//   post: Post;
//   postId: number;
//   createdAt: string;
//   scheduledDate: string;
// };
export default function TodayReviewContent({
  data,
  setData,
}: {
  data: todayReviewData[];
  setData: (
    newState:
      | todayReviewData[]
      | ((prevState: todayReviewData[]) => todayReviewData[])
  ) => void;
}) {
  console.log(data, "::!!");
  const [selectedItem, setSelectedItem] = useState<todayReviewData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h2>Review Posts</h2>
      {(data ?? []).map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{
              padding: "8px 16px",
              margin: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className={styles.titleAndDayContainer}>
              <span>{item.post.title}</span>
              <span className={styles.dayTag}>
                - {getDateDiffInDays(item.createdAt, item.scheduledDate)} 일차
              </span>
            </div>
            <TagList tagList={tagToArray(item.post.postTags)}></TagList>
          </div>
        );
      })}

      {isModalOpen && (
        <ReviewContentModal
          selectedItem={selectedItem}
          closeModal={closeModal}
          setData={setData}
        />
      )}
    </div>
  );
  // return <div>오늘의 복습 내용: {JSON.stringify(data)}</div>;
}
