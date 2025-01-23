import PostForm from '@/components/admin/PostForm/PostForm';
import PostTable from '@/components/admin/PostTable/PostTable';
import { useActions } from '@/store';
import { useEffect, useState } from 'react';

const Admin = () => {
  type mode = 'view' | 'create' | 'edit' | 'delete';
  const [mode, setMode] = useState<mode>('view');
  const { getPosts } = useActions();
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="container px-4 mx-auto md:px-1 lg:px-0">
      <div className="flex items-center justify-end gap-3 my-4">
        {mode !== 'create' && (
          <button
            onClick={() => setMode('create')}
            className="px-3 py-2 text-xs text-white uppercase border rounded-sm cursor-pointer hover:bg-slate-800 bg-slate-600 border-slate-800">
            Create new post
          </button>
        )}
      </div>
      {mode === 'view' && <PostTable />}
      {mode === 'create' && <PostForm onCancel={() => setMode('view')} />}
    </div>
  );
};

export default Admin;
