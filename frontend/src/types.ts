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

export type CompanySearchType = {
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
  difficulty: number;
  difficultyText: number;
  platformId: number;
  tags: SearchTag[];
  platform: string;
  companies: CompanySearchType[];
};

export type PaginationType = {
  total: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

export type PostWithPaginationType = {
  posts: Post[];
  pagination: PaginationType;
};

export type PostTableType = Post & {
  selected: boolean;
};

export type PostBody = Omit<
  Post,
  'id' | 'platform' | 'difficulty' | 'tags' | 'companies' | 'difficultyText'
> & {
  difficulty: number;
  tags: number[];
  companies: number[];
};

export type ApiErrorResponse = {
  status: boolean;
  error: Record<string, unknown>;
  code: number;
  message: string;
  timestamp: string;
};

export type MultiSelectTag = {
  label: string;
  value: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ApiErrorResponse;
