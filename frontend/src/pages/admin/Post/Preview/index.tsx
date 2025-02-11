import { useActions, useAppState } from '@/store';
import clsx from 'clsx';
import { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import DisplayTopics from '@/components/admin/PostPreview/DisplayTopics';
import BusinessIcon from '@/components/icons/BusinessIcon';
import TagsIcon from '@/components/icons/TagsIcon';

const PostPreview = () => {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isTopicsOpen, setIsTopicsOpen] = useState<boolean>(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState<boolean>(false);
  const { getPost, setPostEmpty } = useActions().postAction;
  const { post } = useAppState();
  const topicsContainerRef = createRef<HTMLDivElement>();
  const companiesContainerRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (isNaN(parseInt(id as string))) {
      setError(
        'Passed id is wrong, please ensure you used correct number for post id'
      );
    } else {
      getPost(parseInt(id as string));
    }

    return () => {
      setPostEmpty();
    };
  }, [id, getPost, setPostEmpty]);
  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-full px-4 mx-auto md:px-1 lg:px-0">
        <h2 className="text-xl font-bold leading-tight">{error}</h2>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="container flex items-center justify-center min-h-full px-4 mx-auto md:px-1 lg:px-0">
        <h2 className="text-xl font-bold leading-tight">Post not found</h2>
      </div>
    );
  }
  return (
    <div className="container px-4 mx-auto md:px-1 lg:px-0">
      {post && (
        <div className="my-5">
          <h2 className="mb-3 text-lg font-bold">
            {post.problemId}. {post.title}
          </h2>
          <div className="flex items-center justify-start mb-3 gap-x-3">
            <div
              className={clsx(
                `py-2 px-4 text-xs rounded-full bg-fill-secondary`,
                {
                  'text-[#1cbaba]': post.difficulty === 1,
                  'text-[#ffb700]': post.difficulty === 2,
                  'text-red-600': post.difficulty === 3
                }
              )}>
              {post.difficultyText}
            </div>
            <div
              onClick={() => {
                setIsTopicsOpen(true);
                if (topicsContainerRef.current) {
                  topicsContainerRef.current.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              }}
              role="button"
              className="flex items-center justify-center px-4 py-2 text-xs rounded-full gap-x-2 bg-fill-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M.205 9.166A.65.65 0 0 1 0 8.696V3.358c-.01-.334.076-.639.27-.89C.5 2.172.848 2.024 1.299 2h5.518c.18 0 .353.07.48.194l9.015 8.798c.186.22.273.491.24.774c-.027.234-.124.45-.322.673l-5.443 5.236a1.12 1.12 0 0 1-.782.319c-.275 0-.532-.098-.818-.318zm1.15-.747l8.628 8.18l5.122-4.925l-8.57-8.36h-5.18zM9.976 3.32h-2.99a.667.667 0 0 1-.677-.657c0-.363.304-.658.678-.658h3.271c.18 0 .353.07.48.194l9.015 8.798c.187.22.273.492.24.775c-.027.234-.124.449-.322.673l-5.442 5.236a1.12 1.12 0 0 1-.782.318c-.276 0-.532-.097-.819-.318l-1.341-1.271a.643.643 0 0 1-.012-.93a.69.69 0 0 1 .958-.01l1.191 1.134l5.123-4.924zm-5.48 4.845c-1.122 0-2.032-.882-2.032-1.97c0-1.09.91-1.972 2.032-1.972s2.031.882 2.031 1.971s-.91 1.971-2.031 1.971m0-1.314a.667.667 0 0 0 .677-.657a.667.667 0 0 0-.677-.657a.667.667 0 0 0-.678.657c0 .363.304.657.678.657"></path>
              </svg>
              <span>Topics</span>
            </div>
            <a
              href={post.link}
              target="_blank"
              className="flex items-center justify-center px-4 py-2 text-xs rounded-full gap-x-2 bg-fill-secondary text-label-2 hover:text-label-1"
              rel="noreferer noopener">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.077 16.077q-1.692 0-2.884-1.192T3 12t1.193-2.885t2.884-1.193h3.039q.212 0 .356.144t.144.357t-.144.356t-.356.143H7.075q-1.267 0-2.171.904T4 12t.904 2.173t2.17.904h3.042q.212 0 .356.144t.144.357t-.144.356t-.356.143zM9 12.5q-.213 0-.356-.144t-.144-.357t.144-.356T9 11.5h6q.213 0 .356.144t.144.357t-.144.356T15 12.5zm4.885 3.577q-.213 0-.357-.144t-.144-.357t.144-.356t.356-.143h3.041q1.267 0 2.171-.904T20 12t-.904-2.173t-2.17-.904h-3.041q-.213 0-.357-.144q-.143-.144-.143-.357t.143-.356t.357-.143h3.038q1.692 0 2.885 1.192T21 12t-1.193 2.885t-2.884 1.193z"></path>
              </svg>
              <span>Link</span>
            </a>
          </div>
          <div className="max-w-full">
            <ReactMarkdown
              className="max-w-full prose markdown"
              children={post.description}
            />
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <hr className="border-gray-300 border-divider-3" />
            <DisplayTopics
              title="Topics"
              ref={topicsContainerRef}
              data={post.tags}
              isOpen={isTopicsOpen}
              icon={<TagsIcon />}
              setIsOpen={(isOpen) => setIsTopicsOpen(isOpen)}
            />
            <DisplayTopics
              title="Companies"
              ref={companiesContainerRef}
              data={post.companies}
              isOpen={isCompaniesOpen}
              setIsOpen={(isOpen) => setIsCompaniesOpen(isOpen)}
              icon={<BusinessIcon />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPreview;
