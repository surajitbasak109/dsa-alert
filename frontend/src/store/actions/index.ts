import { Context } from '@/store';
import { ApiErrorResponse, PostBody, SearchTag } from '@/types';

export const setIsEditorReady = ({ state }: Context, isReady: boolean) => {
  state.editor.isEditorReady = isReady;
};

export const getPosts = async ({ state, effects }: Context) => {
  const allPosts = await effects.api.getPosts();
  state.posts = allPosts.data;
};

export const getPlatformSelectData = async ({ state, effects }: Context) => {
  const allPlatforms = await effects.api.getPlatformSelectData();
  state.platformSelectData = allPlatforms.data;
};

export const searchTags = async (
  { state, effects }: Context,
  value: string
) => {
  const allTags = await effects.api.searchTags(value);
  state.searchTagsData = allTags.data;
};

export const postFormAction = {
  setDescription: ({ state }: Context, description: string) => {
    state.postForm.description = description;
  },
  setSelectedTags: (
    { state }: Context,
    selectedTags: Omit<SearchTag, 'highlighted'>[]
  ) => {
    state.postForm.selectedTags = selectedTags;
  },
  setTitle: ({state}: Context, title: string) => {
    state.postForm.title = title;
  },
  setPlatform: ({state}: Context, platformId: number) => {
    state.postForm.platformId = platformId;
  },
  setDifficulty: ({state}: Context, difficulty: number) => {
    state.postForm.difficulty = difficulty;
  },
  setLink: ({state}: Context, link: string) => {
    state.postForm.link = link;
  },
  setTags: ({state}: Context, tags: number[]) => {
    state.postForm.tags = tags;
  },
  setProblemId: ({state}: Context, problemId: string) => {
    state.postForm.problemId = problemId;
  },
  setPostFormEmpty: ({state}: Context) => {
    state.postForm = {
      title: '',
      platformId: 1,
      problemId: '',
      difficulty: 1,
      link: '',
      tags: [],
      description: '# Problem Heading',
      selectedTags: [],
    };
    state.searchTagsData = [];
  }
};

export const addPost = async ({state, effects }: Context, post: PostBody) => {
  const response = await effects.api.addPost(post);
  if (response.status) {
    if ("data" in response) {
      state.posts.push(response.data);
    }
  } else {
    console.error("Error adding post: ", response.message);
    state.apiErrors = response as ApiErrorResponse;
  }
};

export const clearApiErrors = ({state}: Context) => {
  state.apiErrors = null;
};
