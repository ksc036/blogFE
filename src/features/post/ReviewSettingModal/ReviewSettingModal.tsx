import { useEffect, useState } from "react";
import styles from "./ReviewSettingModal.module.css";
import axiosInstance from "@/shared/lib/axiosInstance";
type planList = {
  id: number;
  reviewDays: number[];
  name: string;
};
export default function ReviewSettingModal({
  onClose,
  postId,
}: {
  onClose: () => void;
  postId: number;
}) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 만약에 overlay 영역(바깥 영역)을 클릭한 경우 → onClose 실행
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const [planName, setPlanName] = useState<string>();
  const [repeatDays, setRepeatDays] = useState<number[]>([]);
  const [inputDay, setInputDay] = useState("");
  const [planList, setPlanList] = useState<planList[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [reviewPlanMode, setReviewPlanMode] = useState(false);

  useEffect(() => {
    async function fetchPlanData() {
      const res: any = await axiosInstance.get("/posts/getUserPlanList");
      setPlanList(res.data);
    }
    fetchPlanData();
  }, []);
  const handleAddDay = () => {
    const dayNumber = parseInt(inputDay, 10);
    if (
      (!isNaN(dayNumber) && !repeatDays.includes(dayNumber)) ||
      dayNumber >= 0
    ) {
      if (repeatDays.includes(dayNumber)) {
        return;
      }
      let newDay = [...repeatDays, dayNumber];
      // console.log(newDay)
      setRepeatDays(newDay.sort((a, b) => a - b));
    }
    setInputDay("");
  };
  const addPlan = async () => {
    try {
      const response = await axiosInstance.post("/posts/reviewPlan", {
        planName,
        repeatDays,
      });
      const newPlan: planList = response.data;
      console.log("reponse::", response);
      setPlanName("");
      setRepeatDays([]);
      setReviewPlanMode(false);
      setPlanList((prev) => [...prev, newPlan]);
      //여기다가 review 받아온거 넣는것도 해주야함.
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveDay = (day: number) => {
    setRepeatDays(repeatDays.filter((d) => d !== day));
  };
  const handleSave = async () => {
    if (!selectedPlanId) {
      onClose();
      return;
    }
    // 여기서 planName과 repeatDays를 서버에 보내거나 상위 컴포넌트로 넘기면 됨
    try {
      await axiosInstance.post("/posts/reviewInstance", {
        planId: selectedPlanId,
        postId,
      });
      onClose();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeletePlan = async (id: number) => {
    console.log("delete Item", id);
    try {
      const res = await axiosInstance.delete("/posts/reviewPlan", {
        params: { id },
      });
      setPlanList((prev) => prev.filter((item) => res.data.id !== item.id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2>Plan 설정</h2>

        <div className={styles.field}>
          <label>Plan 추가하기</label>
          <input
            type="text"
            value={planName}
            placeholder="추가할 plan의 이름을 입력하세요"
            onChange={(e) => setPlanName(e.target.value)}
            onFocus={() => setReviewPlanMode(true)}
          />
        </div>
        {reviewPlanMode && (
          <div className={styles.field}>
            <label>반복 날짜 입력 (일)</label>
            <input
              type="number"
              value={inputDay}
              onChange={(e) => setInputDay(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddDay();
              }}
              placeholder="enter눌려서 반복 날짜 추가"
            />
            <div className={styles.chips}>
              {repeatDays.map((day) => (
                <div key={day} className={styles.chip}>
                  {day}일
                  <button onClick={() => handleRemoveDay(day)}>❌</button>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "4px",
                justifyContent: "flex-end",
              }}
            >
              <button onClick={() => setReviewPlanMode(false)}>취소</button>
              <button onClick={addPlan}>플랜추가</button>
            </div>
          </div>
        )}
        {/* <div className={styles.field} style={{ visibility: "hidden" }}> */}

        <div className={styles.planList}>
          {planList.map((item: planList) => (
            <div
              key={item.id}
              onClick={() => setSelectedPlanId(item.id)}
              style={{
                display: "flex", // Flex 사용
                justifyContent: "space-between", // 좌우 정렬
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  selectedPlanId === item.id ? "#999999" : "white",
                color: selectedPlanId === item.id ? "white" : "black",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {item.name} {"[" + item.reviewDays.join(", ") + "]"}
              </span>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); // plan 선택 방지
                  handleDeletePlan(item.id);
                }}
                style={{ background: "none", border: "none" }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}
