import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPostApi, updatePostApi } from "@/entities/post/api/postApi";
import { getPresign } from "@/entities/post/api/presign";
import { uploadImg } from "@/entities/post/api/uploadImg";
type ModalProps = {
  showPublishScreen: boolean;
  setShowPublishScreen: (value: boolean) => void;
  title: string;
  content: string;
  isUpdate: boolean;
  initialThumbnailUrl?: string;
  initialDesc?: string;
  initialVisibility?: boolean;
  initialPostUrl?: string;
  postId?: number;
};

export function usePostUpload({
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
}: ModalProps) {
  const router = useRouter();
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(true);
  const [postUrl, setPostUrl] = useState<string>("");

  const onPublish = async () => {
    try {
      if (isUpdate) {
        const res = await updatePostApi(
          title,
          content,
          thumbnailUrl,
          desc,
          visibility,
          postUrl,
          Number(postId)
        );
        router.push(`/posts/${postId}`); // Next.js의 클라이언트 라우팅
      } else {
        const res = await createPostApi(
          title,
          content,
          thumbnailUrl,
          desc,
          visibility,
          postUrl
        );
        const id = res.postId; // 서버에서 반환해주는 고유 URL
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
      const { url } = await getPresign(file);
      e.target.value = "";
      await uploadImg(file, url);
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

  return {
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
  };
}
