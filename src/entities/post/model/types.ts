import { Me } from "@/entities/user/model/types";
type Count = { likes: number } | null;
export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  desc: string;
  postUrl: string;
  user: Me;
  createdAt: string;
  commentCount?: number;
  _count?: Count;
};
export type PostContent = {};

export type CardType = {
  id: number;
  title: string;
  desc: string;
  thumbnailUrl: string;
};

//subdomain까지는 받아오기.
export type CardType2 = {
  id: number;
  title: string;
  desc: string;
  thumbnailUrl: string;
  userId: number;
  subdomain: string;
};
