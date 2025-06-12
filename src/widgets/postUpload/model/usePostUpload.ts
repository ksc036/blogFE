import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPostApi, updatePostApi } from "@/entities/post/api";
import { getPresign } from "@/shared/upload/presign";
import { uploadImg } from "@/shared/upload/uploadImg";
import { useAppSelector } from "@/shared/store/hooks";
import { Me } from "@/entities/user/types";
import { set } from "@/entities/comment/model/commentSlice";
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
  tags?: string[];
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
  tags,
}: ModalProps) {
  const router = useRouter();
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(true);
  const [postUrl, setPostUrl] = useState<string>("");
  const [reviewLater, setReviewLater] = useState<boolean>(false);
  // const me = useAppSelector((stat) => stat.user.me);
  const me: Me = useAppSelector((state) => state.user.me); // 본인 ID
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
          Number(postId),
          tags
        );
        router.push(
          `https://${me?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/posts/${res.post.postUrl}`
        ); // Next.js의 클라이언트 라우팅
      } else {
        const res = await createPostApi(
          title,
          content,
          thumbnailUrl,
          desc,
          visibility,
          postUrl,
          tags
        );
        // // const id = res.postId; // 서버에서 반환해주는 고유 URL
        router.push(
          `https://${me?.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/posts/${res.post.postUrl}`
        ); // Next.js의 클라이언트 라우팅
      }
    } catch (err) {
      //console.error("포스트 업로드 실패", err);
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
      //console.error("썸네일 업로드 실패", err);
      alert("썸네일 업로드에 실패했습니다.");
    }
  };
  function reviewSetting() {
    setReviewLater(!reviewLater);
  }
  return {
    postUrl,
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
    setThumbnailUrl,
    reviewLater,
    reviewSetting,
  };
}
