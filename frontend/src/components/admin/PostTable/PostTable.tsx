import type { Post } from '@components/admin/PostTable/PostTableData';
import PostTableData from '@components/admin/PostTable/PostTableData';

type Props = {
  posts: Post[];
};

const PostTable = ({ posts }: Props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold">All posts</h3>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            All posts containing title, platform, link etc.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 uppercase">
              ID
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
            <th scope="col" className="px-6 py-3 uppercase">
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostTableData key={post.id} {...post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
