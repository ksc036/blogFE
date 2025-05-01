export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
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
