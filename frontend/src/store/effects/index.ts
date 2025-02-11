import {
  ApiResponse,
  CompanySearchType,
  PlatformSelectProp,
  Post,
  PostBody,
  PostWithPaginationType,
  SearchTag,
  SuccessResponse
} from '@/types';

const apiUrl = import.meta.env.VITE_API_URL;
export const api = {
  getPosts: async (
    page: number = 1
  ): Promise<SuccessResponse<PostWithPaginationType>> => {
    const path = page > 1 ? `/posts?page=${page}` : `/posts`;
    const response = await fetch(apiUrl + path);
    return response.json();
  },
  getPost: async (id: number): Promise<SuccessResponse<Post>> => {
    const response = await fetch(apiUrl + '/posts/' + id);
    return response.json();
  },
  getPlatformSelectData: async (): Promise<
    SuccessResponse<PlatformSelectProp[]>
  > => {
    const response = await fetch(apiUrl + '/platforms');
    return response.json();
  },
  searchTags: async (
    searchTerm: string
  ): Promise<SuccessResponse<SearchTag[]>> => {
    const response = await fetch(`${apiUrl}/tags/search?qs=${searchTerm}`);
    return response.json();
  },
  searchCompanies: async (
    searchTerm: string
  ): Promise<SuccessResponse<CompanySearchType[]>> => {
    const response = await fetch(`${apiUrl}/companies/search?qs=${searchTerm}`);
    return response.json();
  },
  addPost: async (post: PostBody): Promise<ApiResponse<Post>> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });
      const data = await response.json();

      if (!response.ok) {
        return {
          status: false,
          error: data.error || {},
          code: response.status,
          message: data.message || 'An error occurred',
          timestamp: data?.timestamp || new Date().toISOString()
        };
      }

      return data as SuccessResponse<Post>;
    } catch (error) {
      console.error('Network error:', error);
      return {
        status: false,
        error: { message: 'Network error' },
        code: 500,
        message: 'Network error occurred',
        timestamp: new Date().toISOString()
      };
    }
  },
  updatePost: async (
    id: number,
    post: PostBody
  ): Promise<ApiResponse<Post>> => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });
      const data = await response.json();

      if (!response.ok) {
        return {
          status: false,
          error: data.error || {},
          code: response.status,
          message: data.message || 'An error occurred',
          timestamp: data?.timestamp || new Date().toISOString()
        };
      }

      return data as SuccessResponse<Post>;
    } catch (error) {
      console.error('Network error:', error);
      return {
        status: false,
        error: { message: 'Network error' },
        code: 500,
        message: 'Network error occurred',
        timestamp: new Date().toISOString()
      };
    }
  },
  deletePost: async (ids: number[]): Promise<ApiResponse<Post>> => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postIds: ids })
      });
      const data = await response.json();

      if (!response.ok) {
        return {
          status: false,
          error: data.error || {},
          code: response.status,
          message: data.message || 'An error occurred',
          timestamp: data?.timestamp || new Date().toISOString()
        };
      }

      return data as SuccessResponse<Post>;
    } catch (error) {
      console.error('Network error:', error);
      return {
        status: false,
        error: { message: 'Network error' },
        code: 500,
        message: 'Network error occurred',
        timestamp: new Date().toISOString()
      };
    }
  },
};
