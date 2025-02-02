import { Context } from '@/store';

const postTableAction = {
  setSelectedIds({ state }: Context, selectedIds: number[]) {
    state.postTable.selectedIds = selectedIds;
  },
  setAllSelectedIds({ state }: Context, checked: boolean) {
    const ids = state.posts.map((post) => post.id);
    state.postTable.selectedIds = checked ? ids : [];
    state.postTable.posts = state.postTable.posts.map((post) => ({
      ...post,
      selected: checked
    }));
  },
  setSelectedPost(
    { state }: Context,
    { id, isChecked }: { id: number; isChecked: boolean }
  ) {
    state.postTable.posts = state.postTable.posts.map((post) =>
      post.id === id ? { ...post, selected: isChecked } : post
    );
  }
};

export default postTableAction;
