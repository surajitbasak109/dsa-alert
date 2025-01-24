import { Context } from '@/store';

const setIsEditorRead = ({ state }: Context, isReady: boolean) => {
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

export const searchTags = async ({state, effects}: Context, value: string) => {
  const allTags = await effects.api.searchTags(value);
  state.searchTagsData = allTags.data;
}

export const setPostFormDescription = ({state}: Context, description: string) => {
  state.postForm.description = description;
}

export { setIsEditorRead };
