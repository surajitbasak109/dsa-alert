import InputField from '@/components/UI/InputField';
import { FormEvent, useEffect } from 'react';
import TagsInput from './TagsInput';
import DescriptionEditor from './DescriptionEditor';
import { useActions, useAppState } from '@/store';

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
  id?: number;
};

const PostForm = ({ onCancel, id }: PostFormProp) => {
  const {
    postAction: { getPlatformSelectData, addPost, getPost, updatePost },
    postFormAction: {
      setPostFormId,
      setPostForm,
      setPostFormEmpty,
      setTitle,
      setProblemId,
      setPlatform,
      setLink,
      setDifficulty,
      setSelectedTags
    },
    clearApiErrors
  } = useActions();
  const {
    platformSelectData,
    postForm: postFormBody,
    apiErrors,
    post
  } = useAppState();
  useEffect(() => {
    getPlatformSelectData();
  }, [getPlatformSelectData]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { selectedTags, ...rest } = postFormBody.data;
    const tags = selectedTags.map((tag) => Number(tag.id));
    const postBody = {
      ...rest,
      tags
    };
    if (id) {
      updatePost({ id, post: postBody });
    } else {
      addPost(postBody);
    }
    setPostFormEmpty();
    onCancel();
  };

  useEffect(() => {
    if (id) {
      setPostFormId(id);
      getPost(id);
    }
  }, [id, setPostFormId, getPost]);

  useEffect(() => {
    if (post) {
      setPostForm(post);
    }
  }, [setPostForm, post]);

  return (
    <form
      className="relative w-full px-4 py-3 mx-auto mb-3 bg-white shadow-md md:max-w-7xl sm:rounded-lg"
      onSubmit={handleSubmit}>
      <h2 className="mb-3 text-xl font-bold">
        {id ? 'Edit post' : 'Create a new Post'}
      </h2>
      {apiErrors && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 text-red-500 bg-red-100">
          <div>{apiErrors.message}</div>
          <button
            onClick={() => clearApiErrors()}
            className="absolute top-0 right-0 p-2 cursor-pointer focus:outline-none">
            <svg
              xmlns="http://www.w3.org/
              2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M2.293 2.293a1 1 0 011.414 0L10
                8.586l6.293-6.293a1 1 0 111.414 1.414L11.414
                10l6.293 6.293a1 1 0 01-1.414 1.414L10
                11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586
                10 2.293 3.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      )}
      <InputField
        label="Title"
        id="title"
        name="title"
        type="text"
        value={postFormBody.data.title}
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
        required={true}
      />
      <div className="flex flex-col items-center justify-between w-full gap-1 lg:gap-3 lg:flex-row">
        <InputField
          label="Problem ID"
          id="problem-id"
          name="problemId"
          type="text"
          value={postFormBody.data.problemId}
          placeholder="Enter problem ID"
          required={true}
          onChange={(e) => setProblemId(e.target.value)}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={postFormBody.data.platformId}
            onChange={(e) => setPlatform(Number(e.target.value))}>
            <option>Select Platform</option>
            {platformSelectData?.map((platform) => (
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
            value={postFormBody.data.difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
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

      {!post && (
        <TagsInput onChange={(selectedTags) => setSelectedTags(selectedTags)} />
      )}

      {post && (
        <TagsInput
          onChange={(selectedTags) => setSelectedTags(selectedTags)}
          value={post.tags}
        />
      )}

      <InputField
        type="url"
        name="link"
        id="link"
        label="Link"
        placeholder="Enter link"
        value={postFormBody.data.link}
        onChange={(e) => setLink(e.target.value)}
        required={true}
      />

      <DescriptionEditor />

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
