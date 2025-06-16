import { PostTag } from "@/entities/tag/types";

export function tagToArray(data: PostTag[]): string[] {
  return data.map((t) => t.tag.name);
}
