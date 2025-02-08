import { Context } from '@/store';
import { CompanySearchType, Post, SearchTag } from '@/types';
const postFormAction = {
  setDescription: ({ state }: Context, description: string) => {
    state.postForm.data.description = description;
  },
  setSelectedTags: (
    { state }: Context,
    selectedTags: Omit<SearchTag, 'highlighted'>[]
  ) => {
    state.postForm.data.selectedTags = selectedTags;
  },
  setSelectedCompanies: (
    { state }: Context,
    selectedCompanies: Omit<CompanySearchType, 'highlighted'>[]
  ) => {
    state.postForm.data.selectedCompanies = selectedCompanies;
  },
  setTitle: ({ state }: Context, title: string) => {
    state.postForm.data.title = title;
  },
  setPlatform: ({ state }: Context, platformId: number) => {
    state.postForm.data.platformId = platformId;
  },
  setDifficulty: ({ state }: Context, difficulty: number) => {
    state.postForm.data.difficulty = difficulty;
  },
  setLink: ({ state }: Context, link: string) => {
    state.postForm.data.link = link;
  },
  setTags: ({ state }: Context, tags: number[]) => {
    state.postForm.data.tags = tags;
  },
  setProblemId: ({ state }: Context, problemId: string) => {
    state.postForm.data.problemId = problemId;
  },
  setPostFormEmpty: ({ state }: Context) => {
    state.postForm.id = undefined;
    state.postForm.data = {
      title: '',
      platformId: 1,
      problemId: '',
      difficulty: 1,
      link: '',
      tags: [],
      companies: [],
      description: '# Problem Heading',
      selectedTags: [],
      selectedCompanies: []
    };
    state.searchTagsData = [];
    state.searchCompaniesData = [];
  },
  setPostFormId: async ({ state }: Context, id: number) => {
    state.postForm.id = id;
  },
  setPostForm: ({ state }: Context, post: Post) => {
    const {
      tags,
      difficulty,
      title,
      description,
      platformId,
      link,
      problemId,
      companies
    } = post;
    state.postForm.data = {
      title,
      problemId,
      description,
      platformId,
      link,
      difficulty,
      selectedTags: tags,
      selectedCompanies: companies,
      companies: companies.map((company) => company.id),
      tags: tags.map((tag) => tag.id)
    };
  }
};

export default postFormAction;
