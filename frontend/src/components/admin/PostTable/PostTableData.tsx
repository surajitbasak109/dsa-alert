import CheckBox from '@/components/UI/CheckBox';
import { useActions, useAppState } from '@/store';
import { PostTableType } from '@/types';

type PostTableProp = {
  post: PostTableType;
};

const PostTableData = ({ post }: PostTableProp) => {
  const { selectedIds } = useAppState().postTable;
  const {
    postTableAction: { setSelectedIds, setSelectedPost }
  } = useActions();
  const handleRowCheckboxChange = (
    checked: boolean,
    element: HTMLElement | null
  ) => {
    if (element?.dataset?.id) {
      const selectedId = element?.dataset?.id;
      if (checked) {
        setSelectedIds([...selectedIds, parseInt(selectedId)]);
      } else {
        const filteredIds = [...selectedIds].filter(
          (id) => id !== parseInt(selectedId)
        );
        setSelectedIds(filteredIds);
      }
      setSelectedPost({
        id: parseInt(selectedId),
        isChecked: checked
      });
    }
  };
  return (
    <tr className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
      <td scope="row" className="relative px-4 py-3">
        <CheckBox
          data-id={post.id}
          id={`row-data-${post.id}`}
          checked={post.selected}
          onChange={handleRowCheckboxChange}
        />
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {post.title}
      </td>
      <td className="px-6 py-4">{post.problemId}</td>
      <td className="px-6 py-4">
        <a className="text-blue-600" target="_blank" href={post.link}>
          Link
        </a>
      </td>
      <td className="px-6 py-4">{post.difficulty}</td>
      <td className="px-6 py-4">{post.platform}</td>
      <td className="hidden px-6 py-4 xl:block">
        <div className="flex flex-wrap justify-start space-x-2 gap-y-2 items-around">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              className="inline-block px-2 py-1 text-xs text-white rounded bg-slate-600"
              key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default PostTableData;
