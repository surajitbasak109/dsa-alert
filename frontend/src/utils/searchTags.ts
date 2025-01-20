import { SearchTag, SuccessResponse } from '@/types';

const searchTags = async (searchTerm: string): Promise<SearchTag[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/tags/search?qs=${searchTerm}`);
  const data: SuccessResponse<SearchTag[]> = await response.json();
  return data.data;
};

export default searchTags;
