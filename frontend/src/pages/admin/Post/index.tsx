import PostForm from '@/components/admin/PostForm/PostForm';
import PostTable from '@/components/admin/PostTable/PostTable';
import ConfirmDialog from '@/components/UI/ConfirmDialog';
import { useActions, useAppState } from '@/store';
import { useEffect, useState } from 'react';

const Post = () => {
  type mode = 'view' | 'create' | 'edit';
  const [mode, setMode] = useState<mode>('view');
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const { selectedIds } = useAppState().postTable;
  const {
    postAction: { getPosts, setPostEmpty, deletePost },
    postFormAction: { setPostFormEmpty }
  } = useActions();
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleDeletePost = () => {
    deletePost(selectedIds[0]);
    setDeleteConfirmModalOpen(false);
  };

  return (
    <div className="container px-4 mx-auto md:px-1 lg:px-0">
      <div className="flex items-center justify-end gap-3 my-4">
        {mode === 'view' && (
          <button
            onClick={() => {
              setMode('create');
            }}
            className="px-4 py-1 text-sm font-bold text-white uppercase border rounded-full cursor-pointer hover:bg-slate-800 bg-slate-600 border-slate-800">
            Create new post
          </button>
        )}
        {selectedIds.length === 1 && mode === 'view' && (
          <button
            onClick={() => {
              setMode('edit');
            }}
            className="px-4 py-1 font-bold text-sm text-black uppercase bg-[#f90] border border-[#f90] rounded-full cursor-pointer hover:bg-[#f90]">
            Edit post
          </button>
        )}
        {selectedIds.length > 0 && (
          <button
            onClick={() => setDeleteConfirmModalOpen(true)}
            className="px-4 py-1 text-sm font-bold text-white uppercase bg-red-600 border border-red-600 rounded-full cursor-pointer hover:bg-red-700">
            Delete {selectedIds.length} post{selectedIds.length > 1 && 's'}
          </button>
        )}
      </div>
      {mode === 'view' && <PostTable />}
      {mode === 'create' && <PostForm onCancel={() => setMode('view')} />}
      {mode === 'edit' && (
        <PostForm
          id={selectedIds[0]}
          onCancel={() => {
            setPostEmpty();
            setPostFormEmpty();
            setMode('view');
          }}
        />
      )}
      <ConfirmDialog
        title="Are you sure?"
        onClose={() => setDeleteConfirmModalOpen(false)}
        open={deleteConfirmModalOpen}
        onConfirm={handleDeletePost}>
        <p>You're going to remove this post which cannot be undone</p>
      </ConfirmDialog>
    </div>
  );
};

export default Post;
