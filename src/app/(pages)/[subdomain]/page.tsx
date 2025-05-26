import { urlParams } from "@/shared/types";
import UserBlogPage from "@/widgets/UserBlogPage/UserBlogPage";

export default async function BlogPage({ params }: urlParams) {
  return <UserBlogPage params={params}></UserBlogPage>;
}
