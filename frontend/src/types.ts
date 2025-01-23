export type SuccessResponse<T> = {
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