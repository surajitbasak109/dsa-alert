import { CompanySearchType, SearchTag } from '@/types';

export type PostForm = {
  id?: number;
  data: {
    title: string;
    problemId: string;
    platformId: number;
    difficulty: number;
    link: string;
    description: string;
    tags: number[];
    companies: number[];
    selectedTags: Omit<SearchTag, 'highlighted'>[];
    selectedCompanies: Omit<CompanySearchType, 'highlighted'>[];
  };
};

const postForm: PostForm = {
  data: {
    title: '',
    platformId: 1,
    problemId: '',
    difficulty: 1,
    link: '',
    tags: [],
    companies: [],
    description: '# Problem Heading',
    selectedTags: [],
    selectedCompanies: [],
  }
};

export default postForm;
