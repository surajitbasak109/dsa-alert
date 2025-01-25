import React from 'react';

type EditorButtonsProp = {
  onClick: (key: string) => void;
};

const EditorButtons: React.FC<EditorButtonsProp> = ({ onClick }) => {
  return (
    <div className="flex items-center justify-between w-full px-5">
      <div className="flex items-center h-10 gap-2 shrink-0">
        <button
          type="button"
          className="inline-flex items-center font-medium rounded whitespace-nowrap focus:outline-none hover:bg-[#000a200d] text-gray-700 h-6 w-6 justify-center p-0"
          onClick={() => {
            onClick('bold');
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-4.5 w-4.5 text-gray-8 dark:text-dark-gray-8">
            <path
              fillRule="evenodd"
              d="M17.436 11.633A5 5 0 0115 21H6a1 1 0 01-1-1V4a1 1 0 011-1h8a5 5 0 013.436 8.633zM15 13H7v6h8a3 3 0 100-6zm-1-2a3 3 0 100-6H7v6h7z"
              clipRule="evenodd"></path>
          </svg>
        </button>
        <button
          type="button"
          className="inline-flex items-center font-medium rounded whitespace-nowrap focus:outline-none hover:bg-[#000a200d] text-gray-700 h-6 w-6 justify-center p-0"
          onClick={() => {
            onClick('italic');
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-4.5 w-4.5 text-gray-8 dark:text-dark-gray-8">
            <path
              fillRule="evenodd"
              d="M10.86 19H13a1 1 0 110 2H6a1 1 0 110-2h2.765L13.14 5H11a1 1 0 110-2h7a1 1 0 110 2h-2.765L10.86 19z"
              clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditorButtons;
