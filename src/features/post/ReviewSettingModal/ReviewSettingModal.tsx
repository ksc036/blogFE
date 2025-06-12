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
  const [planList, setPlanList] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPlanData() {
      const res: any = await axiosInstance.get("/posts/getUserPlanList");
      // console.log("res:::::::", res);
      setPlanList(res.data);
    }
    fetchPlanData();
  }, []);
  const handleAddDay = () => {
    const dayNumber = parseInt(inputDay, 10);
    if (!isNaN(dayNumber) && !repeatDays.includes(dayNumber)) {
      let newDay = [...repeatDays, dayNumber];
      // console.log(newDay)
      setRepeatDays(newDay.sort((a, b) => a - b));
    }
    setInputDay("");
  };
  const addPlan = () => {
    console.log("addplan");
    axiosInstance.post("/posts/reviewPlan", {
      planName,
      repeatDays,
    });
    setPlanName("");
    setRepeatDays([]);
  };
  const handleRemoveDay = (day: number) => {
    setRepeatDays(repeatDays.filter((d) => d !== day));
  };
  const handleSave = () => {
    if (!selectedPlanId) {
      onClose();
      return;
    }
    // 여기서 planName과 repeatDays를 서버에 보내거나 상위 컴포넌트로 넘기면 됨
    console.log("저장됨:::", selectedPlanId, postId);
    axiosInstance.post("/posts/reviewInstance", {
      planId: selectedPlanId,
      postId,
    });
    onClose();
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
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>

        {/* <div className={styles.field} style={{ visibility: "hidden" }}> */}
        <div className={styles.field}>
          <label>반복 날짜 입력 (일)</label>
          <input
            type="number"
            value={inputDay}
            onChange={(e) => setInputDay(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddDay();
            }}
          />
          <div className={styles.chips}>
            {repeatDays.map((day) => (
              <div key={day} className={styles.chip}>
                {day}일<button onClick={() => handleRemoveDay(day)}>❌</button>
              </div>
            ))}
          </div>
          <button onClick={handleAddDay}>취소</button>
          <button onClick={addPlan}>플랜추가버튼으로 만들자</button>
        </div>

        <div className={styles.planList}>
          {planList.map((item: planList) => (
            <div
              key={item.id}
              onClick={() => setSelectedPlanId(item.id)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  selectedPlanId === item.id ? "#1abc9c" : "white",
                color: selectedPlanId === item.id ? "white" : "black",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.name} {"[" + item.reviewDays.join(", ") + "]"}
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}
