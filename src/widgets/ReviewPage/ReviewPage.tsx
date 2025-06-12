"use client";
import { useEffect, useState } from "react";
import style from "./ReviewPage.module.css";
import { fetchReviews, fetchReviewsStatus } from "@/entities/post/api";
import TodayReviewContent from "./ui/TodayReviewContent";
import ReviewStatusContent from "./ui/ReviewStatusContent";
export default function ReviewPage() {
  const tabList = ["오늘의 복습", "복습 현황"] as const;
  type Tab = (typeof tabList)[number];
  const [activeTab, setActiveTab] = useState<Tab>("오늘의 복습");
  const [data, setData] = useState(null);
  const tabApiMap = {
    "오늘의 복습": fetchReviews,
    "복습 현황": fetchReviewsStatus,
  };
  const tabComponentMap = {
    "오늘의 복습": TodayReviewContent,
    "복습 현황": ReviewStatusContent,
  };
  const ActiveComponent = tabComponentMap[activeTab];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("현재 활성화된 탭:", activeTab, tabApiMap[activeTab]);
        const response = await tabApiMap[activeTab]();
        setData(response);
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
        {ActiveComponent ? <ActiveComponent data={data} /> : null}
      </div>
    </main>
  );
}
