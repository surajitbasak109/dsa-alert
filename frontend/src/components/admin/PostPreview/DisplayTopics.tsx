import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

type DisplayTopicsProp = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: { name: string; id: number }[];
  icon: ReactNode;
};

const DisplayTopics = forwardRef<HTMLDivElement, DisplayTopicsProp>(
  ({ isOpen, setIsOpen, data, title, icon }, ref) => {
    return (
      <>
        <div className="flex flex-col">
          <div
            ref={ref}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center transition-colors cursor-pointer text-label-2 hover:text-lable-1">
            <div className="flex-1 text-sm leading-[22px]">
              <div className="flex items-center gap-2">
                <div className="relative text-[16px] leading-[normal] p-0.5 before:block before:h-4 before:w-4 text-sd-foreground fill-none stroke-current">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    {icon}
                  </div>
                </div>
                <div className="text-body text-text-primary dark:text-text-primary">
                  {title}
                </div>
              </div>
            </div>
            <div className="text-[24px] transition-colors text-gray-4 dark:text-dark-gray-4 group-hover:text-gray-5 dark:group-hover:text-dark-gray-5">
              <svg
                className={clsx(`transition-transform origin-center`, {
                  'rotate-180': isOpen
                })}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="m19.142 9.929l-6.364 6.364a1 1 0 0 1-1.415 0L5 9.929"></path>
              </svg>
            </div>
          </div>
          <div
            className="overflow-hidden transition-all"
            style={{
              height: isOpen ? '32px' : 0,
              transitionDelay: '0.25s'
            }}>
            <div className="flex flex-wrap gap-1 mt-2 pl-7">
              {data.map((datum) => (
                <span
                  className="relative inline-flex items-center justify-center gap-1 px-2 py-1 text-xs no-underline rounded-full hover:text-current bg-fill-secondary text-text-secondary"
                  key={datum.id}>
                  {datum.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-gray-300 border-divider-3" />
      </>
    );
  }
);

export default DisplayTopics;
