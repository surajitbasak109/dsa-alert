import { SearchTag } from '@/types';

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
    selectedTags: Omit<SearchTag, 'highlighted'>[];
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
    description: '# Problem Heading',
    selectedTags: []
  }
};

export default postForm;
