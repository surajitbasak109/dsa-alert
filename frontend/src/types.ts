export type SuccessResponse<T> = {
  status: boolean;
  code: number;
  data: T;
  message: string;
  timestamp: string;
};

export type PlatformSelectProp = {
  id: number;
  name: string;
};

export type SearchTag = {
  id: number;
  name: string;
  highlighted?: boolean;
};

export type Post = {
  id: number;
  title: string;
  problemId: string;
  link: string;
  description: string;
  difficulty: string;
  platformId: number;
  tags: string[];
  platform: string;
};

export type PostBody = Omit<Post, 'id' | 'platform' | 'difficulty' | 'tags'> & {
  difficulty: number;
  tags: number[];
};

export type ApiErrorResponse = {
  status: boolean;
  error: Record<string, unknown>;
  code: number;
  message: string;
  timestamp: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ApiErrorResponse;
