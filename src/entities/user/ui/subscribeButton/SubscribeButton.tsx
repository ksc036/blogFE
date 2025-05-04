"use client";

import { useState } from "react";
import styles from "./SubscribeButton.module.css";
import { useAppSelector } from "@/shared/store/hooks";
import axiosInstance from "@/shared/lib/axiosInstance";
import { Me } from "../../model/types";

export default function subscribeButton({
  isSubscribed: initialSubscribed,
  userId: userId,
}) {
  console.log("initialSubscribed : ", initialSubscribed);
  // console.log(" : ", !isLogined);
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const isLogined = useAppSelector((stat) => stat.user.isLogined);
  const me: Me = useAppSelector((state) => state.user.me); // 본인 ID
  // const me = useAppSelector((state) => state.user.me);
  console.log(me);
  console.log("myId ::::::", me.id, userId);
  if (userId === me.id) return null;
  const handleSubscribe = async () => {
    if (!isLogined) {
      alert("로그인이 필요합니다.");
    }
    try {
      if (!isSubscribed) {
        await axiosInstance.post(`/users/${userId}/follow`);
        setIsSubscribed(!isSubscribed);
      } else {
        await axiosInstance.delete(`/users/${userId}/follow`);
        setIsSubscribed(!isSubscribed);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className={styles.subscribeButton} onClick={handleSubscribe}>
      {isLogined && isSubscribed ? "구독 V" : "+ 구독"}
    </div>
  );
}
