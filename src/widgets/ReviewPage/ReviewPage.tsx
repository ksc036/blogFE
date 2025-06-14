"use client";
import { useEffect, useState } from "react";
import style from "./ReviewPage.module.css";
import { fetchReviews, fetchReviewsStatus } from "@/entities/post/api";
import TodayReviewContent from "./ui/TodayReviewContent/TodayReviewContent";
import ReviewStatusContent from "./ui/ReviewStatusContent/ReviewStatusContent";
import { Post } from "@/entities/post/types";
import axiosInstance from "@/shared/lib/axiosInstance";
export type ReviewInstance = {
  id: number;
  status: "PENDING" | "DONE" | "MISSED";
  scheduledDate: string;
  reviewedAt: string | null;
};
export type reviewStatusData = {
  id: number;
  post: Post;
  postId: number;
  reviewInstances: ReviewInstance[];
};
export type todayReviewData = {
  id: number;
  post: Post;
  postId: number;
  createdAt: string;
  scheduledDate: string;
};
export default function ReviewPage() {
  const tabList = ["오늘의 복습", "복습 현황"] as const;
  type Tab = (typeof tabList)[number];
  const [activeTab, setActiveTab] = useState<Tab>("오늘의 복습");

  const [reviewStatusData, setReviewStatusData] = useState<reviewStatusData[]>(
    []
  );
  const [todayReviewData, setTodayReviewData] = useState<todayReviewData[]>([]);

  // const tabApiMap = {
  //   "복습 현황": fetchReviewsStatus,
  //   "오늘의 복습": fetchReviews,
  // };
  // const tabComponentMap = {
  //   "오늘의 복습": TodayReviewContent,
  //   "복습 현황": ReviewStatusContent,
  // };
  // const ActiveComponent = tabComponentMap[activeTab];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("현재 활성화된 탭:", activeTab, tabApiMap[activeTab]);
        if (activeTab === "오늘의 복습") {
          const response = await fetchReviews();
          setTodayReviewData(response);
        } else {
          const response = await fetchReviewsStatus();
          setReviewStatusData(response);
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };

    fetchData();
  }, [activeTab]);
  return (
    <main>
      <div className={style.toggle}>
        {tabList.map((tab) => (
          <div
            key={tab}
            className={`${style.tab} ${activeTab === tab ? style.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className={style.content}>
        {activeTab === "오늘의 복습" && (
          <TodayReviewContent
            data={todayReviewData}
            setData={setTodayReviewData}
          />
        )}
        {activeTab === "복습 현황" && (
          <ReviewStatusContent data={reviewStatusData} />
        )}
      </div>
    </main>
  );
}
