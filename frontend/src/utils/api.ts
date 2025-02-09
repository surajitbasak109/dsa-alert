import { CompanySearchType, SearchTag, SuccessResponse } from '@/types';
const apiUrl = import.meta.env.VITE_API_URL;
export const searchCompanies = async (
  searchTerm: string
): Promise<SuccessResponse<CompanySearchType[]>> => {
  const response = await fetch(`${apiUrl}/companies/search?qs=${searchTerm}`);
  return response.json();
};
export const searchTags = async (
  searchTerm: string
): Promise<SuccessResponse<SearchTag[]>> => {
  const response = await fetch(`${apiUrl}/tags/search?qs=${searchTerm}`);
  return response.json();
};
