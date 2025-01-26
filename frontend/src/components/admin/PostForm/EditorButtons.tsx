import React from 'react';

type EditorButtonsProp = {
  onClick: (key: string) => void;
};

const EditorButtons: React.FC<EditorButtonsProp> = ({ onClick }) => {
  return (
    <div className="flex items-center justify-between w-full px-5">
      <div className="flex items-center h-10 gap-2 shrink-0">
        <button
          title="Bold: Ctrl + B"
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
          title="Italic: Ctrl + I"
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
        <div className="h-3 border-l border-divider-2 dark:border-gray-7"></div>
        <button
          title="Ordered List: Ctrl + O"
          type="button"
          className="inline-flex items-center font-medium rounded whitespace-nowrap focus:outline-none hover:bg-[#000a200d] text-gray-700 h-6 w-6 justify-center p-0"
          onClick={() => {
            onClick('ordered-list');
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
              d="M7 6a1 1 0 011-1h13a1 1 0 110 2H8a1 1 0 01-1-1zm1 13a1 1 0 110-2h13a1 1 0 010 2H8zm0-6a1 1 0 110-2h13a1 1 0 010 2H8zM2.756 4.98l.236-1.18h2.22l-.92 4.6h-1.38l.684-3.42h-.84zm2.823 8.3l-.235 1.192H1.756l.174-.87.073-.117 1.911-1.498c.219-.178.368-.324.445-.434a.49.49 0 00.099-.287.208.208 0 00-.083-.18c-.067-.052-.176-.082-.335-.082a.897.897 0 00-.398.094 1.02 1.02 0 00-.342.272l-.12.144-.968-.702.118-.162c.193-.264.456-.473.786-.625.327-.15.684-.225 1.068-.225.318 0 .602.053.85.16.255.11.456.267.6.47.146.206.22.44.22.698 0 .298-.083.58-.247.839-.158.25-.424.518-.797.807l-.653.506h1.422zm-3.063 3.7l.245-1.18h3.345l-.166.867-.06.11-.93.869a1.205 1.205 0 01.737 1.144c-.001.327-.098.622-.29.881a1.856 1.856 0 01-.774.593c-.322.139-.685.208-1.087.208-.328 0-.636-.045-.924-.135a2.06 2.06 0 01-.743-.4l-.132-.114.688-1.05.173.147c.12.103.267.185.442.245.177.06.364.091.562.091.251 0 .435-.044.554-.124a.31.31 0 00.146-.282c0-.086-.025-.135-.08-.171-.076-.05-.213-.079-.41-.079h-.687l.173-.88.06-.108.674-.632H2.516z"
              clipRule="evenodd"></path>
          </svg>
        </button>
        <button
          title="Unordered List: Ctrl + U"
          type="button"
          className="inline-flex items-center font-medium rounded whitespace-nowrap focus:outline-none hover:bg-[#000a200d] text-gray-700 h-6 w-6 justify-center p-0"
          onClick={() => {
            onClick('unordered-list');
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
              d="M8 7a1 1 0 110-2h13a1 1 0 110 2H8zm0 6a1 1 0 110-2h13a1 1 0 110 2H8zm0 6a1 1 0 110-2h13a1 1 0 110 2H8zM2.952 6.85a1.201 1.201 0 111.698-1.7 1.201 1.201 0 01-1.698 1.7zm0 6a1.201 1.201 0 111.698-1.7 1.201 1.201 0 01-1.698 1.7zm0 6a1.201 1.201 0 111.698-1.7 1.201 1.201 0 01-1.698 1.7z"
              clipRule="evenodd"></path>
          </svg>
        </button>
        <button
          title="Link: Ctrl + K"
          type="button"
          className="inline-flex items-center font-medium rounded whitespace-nowrap focus:outline-none hover:bg-[#000a200d] text-gray-700 h-6 w-6 justify-center p-0"
          onClick={() => {
            onClick('link');
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-4.5 w-4.5 text-gray-8 dark:text-dark-gray-8">
            <path d="M20.474 3.526a5.21 5.21 0 00-7.369 0l-2.947 2.948a5.21 5.21 0 000 7.368 1.042 1.042 0 101.474-1.474 3.126 3.126 0 010-4.42L14.579 5A3.126 3.126 0 0119 9.42l-2.947 2.947a1.042 1.042 0 001.473 1.474l2.948-2.947a5.21 5.21 0 000-7.369z"></path>
            <path d="M13.842 10.158a1.042 1.042 0 10-1.474 1.474 3.126 3.126 0 010 4.42L9.421 19A3.126 3.126 0 115 14.58l2.947-2.947a1.042 1.042 0 10-1.473-1.474l-2.948 2.947a5.21 5.21 0 107.369 7.369l2.947-2.948a5.21 5.21 0 000-7.368z"></path>
          </svg>
        </button>
        <button
          title="Quote"
          type="button"
          className="inline-flex items-center font-medium rounded whitespace-nowrap focus:outline-none hover:bg-[#000a200d] text-gray-700 h-6 w-6 justify-center p-0"
          onClick={() => {
            onClick('quote');
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-4.5 w-4.5 text-gray-8 dark:text-dark-gray-8">
            <path d="M5.941 13.5c.659 0 1.18-.194 1.564-.582.439-.387.63-.886.63-1.495 0-.61-.191-1.08-.575-1.468a1.983 1.983 0 00-1.427-.609c-.301 0-.52.056-.658.11 0-.664.22-1.3.686-1.938a4.098 4.098 0 011.838-1.301V4.5c-1.372.388-2.47 1.08-3.292 2.132C3.911 7.685 3.5 8.931 3.5 10.315c0 .942.247 1.717.686 2.299.466.61 1.042.886 1.755.886zm6.392 0c.658 0 1.18-.194 1.59-.582.385-.387.577-.886.577-1.495 0-.61-.192-1.08-.604-1.468-.384-.387-.85-.609-1.399-.609-.301 0-.52.056-.658.11 0-.664.22-1.3.713-1.938.494-.609 1.098-1.052 1.838-1.301V4.5c-1.371.388-2.469 1.08-3.292 2.132-.822 1.053-1.234 2.299-1.234 3.683 0 .942.247 1.717.713 2.299.44.61 1.043.886 1.756.886z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditorButtons;
