type PostTagWithTag = {
  id: number;
  postId: number;
  tagId: number;
  userId: number;
  tag: {
    id: number;
    name: string;
  };
};
export function tagToArray(data: PostTagWithTag[]): string[] {
  return data.map((t) => t.tag.name);
}
