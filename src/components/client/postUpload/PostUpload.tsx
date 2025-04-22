import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
}: ModalProps) {
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  // ✅ props로 받은 값을 초기값으로 세팅하되 없으면 기본값
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl || "");
  const [desc, setDesc] = useState(initialDesc || "");
  const [visibility, setVisibility] = useState(initialVisibility ?? true);
  const [postUrl, setpostUrl] = useState(initialPostUrl || "");
  const router = useRouter();

  const onPublish = async () => {
    // console.log(
    //   " content : " + content + "\n${title} : " + title,
    //   " thumbnailUrl : " + thumbnailUrl,
    //   "desc : " + desc,
    //   "visibility : " + visibility,
    //   "postUrl : " + postUrl
    // );
    try {
      if (isUpdate) {
        const res = await axiosInstance.put(`/posts/${postId}`, {
          title,
          content,
          thumbnailUrl,
          desc,
          visibility,
          postUrl,
        });
        router.push(`/posts/${postId}`); // Next.js의 클라이언트 라우팅
      } else {
        const res = await axiosInstance.post("/posts", {
          title,
          content,
          thumbnailUrl,
          desc,
          visibility,
          postUrl,
        });
        //redir
        const id = res.data.postId; // 서버에서 반환해주는 고유 URL
        // setShowPublishScreen(false);
        console.log(id);
        router.push(`/posts/${id}`); // Next.js의 클라이언트 라우팅
      }
    } catch (err) {
      console.error("포스트 업로드 실패", err);
      alert("포스트 업로드에 실패했습니다.");
    }
  };

  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Presigned URL 요청
      const res = await axiosInstance.post("/presign", {
        filename: file.name,
      });
      e.target.value = "";

      const { url } = res.data;

      // S3에 업로드
      await axios.put(process.env.NEXT_PUBLIC_S3_URL + url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // 미리보기 URL 추출
      const imageUrl = process.env.NEXT_PUBLIC_S3_URL + url.split("?")[0];
      setThumbnailUrl(imageUrl);
    } catch (err) {
      console.error("썸네일 업로드 실패", err);
      alert("썸네일 업로드에 실패했습니다.");
    }
  };
  useEffect(() => {
    // content 내 첫 번째 이미지 URL 추출
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    if (match && !thumbnailUrl) {
      setThumbnailUrl(match[1]);
    }
  }, [content, thumbnailUrl]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        borderTop: "1px solid #ddd",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease-in-out",
        transform: showPublishScreen ? "translateY(0%)" : "translateY(100%)",
        zIndex: 1000,
        padding: "2rem",
        display: "flex",
        gap: "2rem",
      }}
    >
      {/* 썸네일 및 설명 */}
      <div style={{ width: "40%", textAlign: "center" }}>
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={thumbnailUrl || "/placeholder-thumbnail.png"}
              alt="썸네일 미리보기"
              style={{ width: "200px", height: "auto", objectFit: "cover" }}
            />
            <span style={{ color: "#999" }} onClick={handleThumbnailClick}>
              썸네일 업로드
            </span>
            <input
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              onChange={handleThumbnailUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        {/* <div style={{ fontSize: "14px", color: "#666" }}>
          당신의 포스트를 짧게 소개해보세요.
        </div> */}
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="당신의 포스트를 짧게 소개해보세요."
          style={{
            fontSize: "14px",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "6px 10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* 설정 패널 */}
      <div style={{ width: "60%" }}>
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
            <span style={{ marginRight: 4 }}>ksc036/</span>
            <input
              type="text"
              onChange={(e) => setpostUrl(e.target.value)}
              placeholder="default"
              style={{
                marginTop: "0.5rem",
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {/* <span>ksc036dd/</span>
          <input
            type="text"
            onChange={(e) => setpostUrl(e.target.value)}
            placeholder="ksc036/default"
            style={{
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
            }}
          /> */}
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
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
  );
}
