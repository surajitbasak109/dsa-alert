import { PlatformSelectProp, Post, SearchTag, SuccessResponse } from '@/types';

const apiUrl = import.meta.env.VITE_API_URL;
export const api = {
  getPosts: async (): Promise<SuccessResponse<Post[]>> => {
    const response = await fetch(apiUrl + '/posts');
    return response.json();
  },
  getPlatformSelectData: async (): Promise<
    SuccessResponse<PlatformSelectProp[]>
  > => {
    const response = await fetch(apiUrl + '/platforms');
    return response.json();
  },
  searchTags: async (searchTerm: string): Promise<SuccessResponse<SearchTag[]>> => {
    const response = await fetch(`${apiUrl}/tags/search?qs=${searchTerm}`);
    return response.json();
  }
};
