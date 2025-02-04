import { PaginationType, PostTableType } from '@/types';

export type PostTableStateType = {
  posts: PostTableType[];
  pagination: PaginationType | null;
  selectedIds: number[];
};

export default {
  posts: [],
  pagination: null,
  selectedIds: []
} satisfies PostTableStateType;
