"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./page.module.css";
import { set } from "@/store/slices/userSlice";

export default function Home() {
  const id = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.page}>
      <h1>hi</h1>
      <h2>id: {id}</h2>
      <button
        onClick={() => {
          dispatch(set());
        }}
      >
        asd
      </button>
    </div>
  );
}
