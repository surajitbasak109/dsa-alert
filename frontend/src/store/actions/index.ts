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

export { setIsEditorRead };
