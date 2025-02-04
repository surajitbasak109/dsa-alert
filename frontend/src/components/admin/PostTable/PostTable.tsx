import CheckBox from '@/components/UI/CheckBox';
import Pagination from '@/components/UI/Pagination';
import { useActions, useAppState } from '@/store';
import PostTableData from '@components/admin/PostTable/PostTableData';
import { useState } from 'react';

const PostTable = () => {
  const {
    postTable: { posts, pagination }
  } = useAppState();
  const {
    postTableAction: { setAllSelectedIds },
    postAction: { getPosts }
  } = useActions();
  const [allRowChecked, setAllRowChecked] = useState<boolean>(false);
  const onCheckAllChange = (checked: boolean) => {
    setAllRowChecked(checked);
    setAllSelectedIds(checked);
  };
  const handlePageChange = (page: number) => {
    getPosts(page); // Fetch posts for the new page
  };
  return (
    <div className="relative pb-5 overflow-x-auto shadow-md sm:rounded-lg">
      {allRowChecked && 'All row has been checked'}
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold">All posts</h3>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            All posts containing title, platform, link etc.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="relative px-6 py-3 uppercase">
              <CheckBox
                checked={allRowChecked}
                id="check-all"
                onChange={onCheckAllChange}
              />
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Title
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Problem ID
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Link
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Platform
            </th>
            <th scope="col" className="hidden px-6 py-3 uppercase xl:block">
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {!posts.length && (
            <tr className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
              <td
                className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                colSpan={7}>
                No Records
              </td>
            </tr>
          )}
          {posts.map((post) => (
            <PostTableData key={post.id} post={post} />
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="max-w-sm mx-auto">
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default PostTable;
