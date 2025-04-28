import { urlParams } from "@/shared/types/types";
import PostForm from "@/widgets/postForm/ui/PostForm";

export default async function EditPage({ params }: urlParams) {
  const { id } = await params;
  return <PostForm postId={Number(id)} />;
}
