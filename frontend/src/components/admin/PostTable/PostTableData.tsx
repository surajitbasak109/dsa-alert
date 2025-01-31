import CheckBox from '@/components/UI/CheckBox';
import { Post } from '@/types';

const PostTableData = ({
  id,
  title,
  problemId,
  link,
  difficulty,
  tags,
  platform
}: Post) => {
  const handleRowCheckboxChange = (checked: boolean, element: HTMLElement | null) => {
    console.log(checked, element?.dataset?.id);
  };
  return (
    <tr className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
      <td scope="row" className="relative px-4 py-3">
        <CheckBox
          data-id={id}
          id={`row-data-${id}`}
          onChange={handleRowCheckboxChange}
        />
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {title}
      </td>
      <td className="px-6 py-4">{problemId}</td>
      <td className="px-6 py-4">
        <a className="text-blue-600" target="_blank" href={link}>
          Link
        </a>
      </td>
      <td className="px-6 py-4">{difficulty}</td>
      <td className="px-6 py-4">{platform}</td>
      <td className="px-6 py-4">{tags.join(',')}</td>
    </tr>
  );
};

export default PostTableData;
