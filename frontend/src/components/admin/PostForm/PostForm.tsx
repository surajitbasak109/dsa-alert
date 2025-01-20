import InputField from '@/components/UI/InputField';
import useGetQuery from '@/hooks/useGetQuery';
import { PlatformSelectProp, SuccessResponse } from '@/types';
import { FormEvent } from 'react';
import TagsInput from './TagsInput';

const difficulties = [
  {
    value: 1,
    label: 'Easy'
  },
  {
    value: 2,
    label: 'Medium'
  },
  {
    value: 3,
    label: 'Hard'
  }
];

type PostFormProp = {
  onCancel: () => void;
};

const PostForm = ({ onCancel }: PostFormProp) => {
  const {
    isLoading,
    error,
    data: platformFetchData
  } = useGetQuery<SuccessResponse<PlatformSelectProp[]>>({
    path: '/platforms'
  });
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    console.error(error);
    return <h2>Error fetching Platform</h2>;
  }
  const platforms = platformFetchData?.data;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log({ ...Object.fromEntries(formData) });
  };
  return (
    <form className="w-full mx-auto md:w-2/3" onSubmit={handleSubmit}>
      <h2 className="mb-3 text-xl font-bold">Create a new Post</h2>
      <InputField
        label="title"
        id="title"
        name="title"
        type="text"
        defaultValue=""
        placeholder="Enter title"
        required={true}
      />
      <div className="flex flex-col items-center justify-between w-full gap-1 lg:gap-3 lg:flex-row">
        <InputField
          label="Problem ID"
          id="problem-id"
          name="problemId"
          type="text"
          defaultValue=""
          placeholder="Enter problem ID"
          required={true}
          wrapperClassName="w-full lg:w-1/3"
        />
        <fieldset className="w-full mb-5 lg:w-1/3">
          <label
            htmlFor="platforms"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Platforms
          </label>
          <select
            id="platforms"
            name="platformId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select Platform</option>
            {platforms?.map((platform) => (
              <option value={platform.id} key={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="w-full mb-5 lg:w-1/3">
          <label
            htmlFor="difficulty"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select Difficulty</option>
            {difficulties?.map((difficulty) => (
              <option value={difficulty.value} key={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      <TagsInput />

      <div className="flex items-center justify-start gap-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Submit
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
