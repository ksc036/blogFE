import { Me } from "@/entities/user/model/types";

export type Comment = {
  postId: number; // 포스트아이디 id
  id: number; // 댓글 id
  content: string; // 게시글 id
  parentId: number | null; // 부모 댓글 id (대댓글인 경우)
  replies?: Comment[]; // ✅ 배열 타입 // 대댓글 (대댓글이 없는 경우 빈 배열)
  userId: number; // 댓글 작성자 id
  createdAt: string;
  user: Me;
};
// export type ReplyComment = {
//   postId: number; // 포스트아이디 id
//   id: number; // 댓글 id
//   content: string; // 게시글 id
//   parentId: number | null; // 부모 댓글 id (대댓글인 경우)
// };
