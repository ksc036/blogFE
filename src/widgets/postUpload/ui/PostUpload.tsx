import axiosInstance from "@/shared/lib/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePostUpload } from "../model/usePostUpload";
import styles from "./PostUpload.module.css";
import { Post } from "@/entities/post/types";
type ModalProps = {
  showPublishScreen: boolean;
  setShowPublishScreen: (value: boolean) => void;
  title: string;
  content: string;
  isUpdate: boolean;
  thumbnailUrl?: string;
  desc?: string;
  visibility?: boolean;
  postUrl?: string;
  postId?: number;
  info: Post;
  tags?: string[];
};
export default function PostUpload({
  content,
  title,
  showPublishScreen,
  isUpdate,
  setShowPublishScreen,
  thumbnailUrl: initialThumbnailUrl,
  desc: initialDesc,
  visibility: initialVisibility,
  postUrl: initialPostUrl,
  postId: postId,
  info,
  tags,
}: ModalProps) {
  const {
    thumbnailInputRef,
    thumbnailUrl,
    onPublish,
    handleThumbnailClick,
    handleThumbnailUpload,
    desc,
    visibility,
    setDesc,
    setVisibility,
    setPostUrl,
    postUrl,
    setThumbnailUrl,
    reviewLater,
    reviewSetting,
  } = usePostUpload({
    content,
    title,
    showPublishScreen,
    isUpdate,
    setShowPublishScreen,
    initialThumbnailUrl,
    initialDesc,
    initialVisibility,
    initialPostUrl,
    postId,
    tags,
  });

  useEffect(() => {
    if (!info) {
      // 게시글 쓰기이면
      if (!postUrl && title) {
        setPostUrl(title.slice(0, 100));
      }
      if (!desc && content) {
        setDesc(content.slice(0, 150));
      }
      const match = content.match(/!\[.*?\]\((.*?)\)/);
      if (match && !thumbnailUrl) {
        setThumbnailUrl(match[1]);
      }
    } else {
      //수정
      setPostUrl(info?.postUrl.slice(0, 100));
      setDesc(info?.desc.slice(0, 150));
      setThumbnailUrl(info?.thumbnailUrl);
      setVisibility(info?.visibility);
    }
  }, [info, title, content]);

  return (
    <div className={styles.container}>
      {/* 썸네일 및 설명 */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <div
          style={{
            width: "100%",
            // height: "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                src={thumbnailUrl || "/images/common/default-thumbnail.png"}
                alt="썸네일 미리보기"
                style={{ width: "200px", height: "auto", objectFit: "cover" }}
              />
              <span
                style={{
                  color: "#999",
                  top: "50%",
                  left: "50%",
                  cursor: "pointer",
                }}
                onClick={handleThumbnailClick}
              >
                {thumbnailUrl ? "썸네일 수정 " : "썸네일 업로드"}
              </span>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              onChange={handleThumbnailUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <input
          type="text"
          value={desc}
          maxLength={150}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="당신의 포스트를 짧게 소개해보세요."
          className={styles.desc}
          style={{
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "6px 10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            textAlign: "right",
            fontSize: "12px",
            color: "#999",
            marginTop: "4px",
          }}
        >
          {desc.length} / 150자
        </div>
      </div>

      {/* 설정 패널 */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            공개 설정
          </label>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <button
              onClick={() => setVisibility(true)}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                background: visibility ? "#000000" : "#f9f9f9",
                color: visibility ? "#fff" : "#333",
                flex: 1,
              }}
            >
              전체 공개
            </button>
            <button
              onClick={() => setVisibility(false)}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                background: visibility ? "#f9f9f9" : "#000000",
                color: visibility ? "#333" : "#fff",
                flex: 1,
              }}
            >
              비공개
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            URL 설정
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 4 }}>posts/</span>
            <input
              type="text"
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="url"
              maxLength={100}
              value={postUrl}
              style={{
                marginTop: "0.5rem",
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "3rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className={styles.reviewButton} onClick={reviewSetting}>
              {reviewLater ? "복습 +" : "복습 V"}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => setShowPublishScreen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#888",
                fontWeight: "bold",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
              }}
            >
              취소
            </button>
            <button
              onClick={onPublish}
              style={{
                background: "#000000",
                border: "none",
                color: "white",
                fontWeight: "bold",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
              }}
            >
              출간하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
