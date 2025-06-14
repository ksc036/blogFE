import { Post } from "@/entities/post/types";
import PostMarkDownContent from "@/features/post/postContent/PostMarkDownContent";
import axiosInstance from "@/shared/lib/axiosInstance";
import { todayReviewData } from "../../ReviewPage";
import styles from "./ReviewContentModal.module.css";

type reviewPost = {
  id: number;
  post: Post;
};

export default function ReviewContentModal({
  closeModal,
  selectedItem,
  setData,
}: {
  closeModal: () => void;
  selectedItem: reviewPost | null;
  setData: (
    newState:
      | todayReviewData[]
      | ((prevState: todayReviewData[]) => todayReviewData[])
  ) => void;
}) {
  const completeReview = () => {
    console.log("compelete");
    try {
      const res = axiosInstance.put("/posts/reviewSuccess", {
        reviewInstanceId: selectedItem?.id,
      });
      //성공하면
      console.log(res);
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedItem?.id)
      );
    } catch (e) {}
    closeModal();
  };
  console.log("selectedItem", selectedItem);
  return (
    <div
      onClick={closeModal} // 바깥 영역 클릭 시 모달 닫기
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 막기 (모달 안 닫힘)
        className={styles.modalInside}
      >
        <h3>{selectedItem?.post.title}</h3>

        {/* <p>{selectedItem?.post.content}</p> */}
        <PostMarkDownContent
          content={selectedItem ? selectedItem?.post.content : " "}
        ></PostMarkDownContent>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}
        >
          <button onClick={closeModal}>닫기</button>
          <button onClick={completeReview}>복습완료</button>
        </div>
      </div>
    </div>
  );
}
