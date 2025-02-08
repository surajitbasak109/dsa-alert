import { Context } from '@/store';
import { ApiErrorResponse, PostBody, PostTableType } from '@/types';

const getPosts = async ({ state, effects }: Context, page: number = 1) => {
  const allPosts = await effects.api.getPosts(page);
  state.posts = allPosts.data.posts;
  state.postTable.posts = allPosts.data.posts.map((data) => ({
    ...data,
    selected: false
  }));
  state.postTable.pagination = allPosts.data.pagination;
};

const getPlatformSelectData = async ({ state, effects }: Context) => {
  const allPlatforms = await effects.api.getPlatformSelectData();
  state.platformSelectData = allPlatforms.data;
};

const searchTags = async ({ state, effects }: Context, value: string) => {
  const allTags = await effects.api.searchTags(value);
  state.searchTagsData = allTags.data;
};

const searchCompanies = async ({ state, effects }: Context, value: string) => {
  const allCompanies = await effects.api.searchCompanies(value);
  state.searchTagsData = allCompanies.data;
};

const addPost = async ({ state, effects }: Context, post: PostBody) => {
  const response = await effects.api.addPost(post);
  if (response.status) {
    if ('data' in response) {
      state.posts.push(response.data);
      state.postTable.posts.push(response.data as PostTableType);
    }
  } else {
    console.error('Error adding post: ', response.message);
    state.apiErrors = response as ApiErrorResponse;
  }
};

const updatePost = async (
  { state, effects }: Context,
  { id, post }: { id: number; post: PostBody }
) => {
  const response = await effects.api.updatePost(id, post);
  if (response.status) {
    if ('data' in response) {
      const posts = state.posts;
      const index = posts.findIndex((post) => post.id == id);
      if (index > -1) {
        posts[index] = response.data;
        state.posts = [...posts];
      }
    }
  } else {
    console.error('Error adding post: ', response.message);
    state.apiErrors = response as ApiErrorResponse;
  }
};

const getPost = async ({ state, effects }: Context, id: number) => {
  const response = await effects.api.getPost(id);
  state.post = response.data;
};

const setPostEmpty = ({ state }: Context) => {
  state.post = null;
};

export default {
  getPosts,
  getPost,
  getPlatformSelectData,
  searchTags,
  addPost,
  updatePost,
  setPostEmpty,
  searchCompanies
};
