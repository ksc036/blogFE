export type PostTag = {
  id: number;
  postId: number;
  tagId: number;
  userId: number;
  tag: {
    id: number;
    name: string;
  };
};
