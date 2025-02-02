import { PostTableType } from "@/types";

export type PostTableStateType = {
  posts: PostTableType[],
  selectedIds: number[];
};

export default {
  posts: [],
  selectedIds: []
} satisfies PostTableStateType;
