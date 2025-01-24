import { useClickAway } from '@/hooks/useClickAway';
import useDebounce from '@/hooks/useDebounce';
import { useActions, useAppState } from '@/store';
import { SearchTag } from '@/types';
import clsx from 'clsx';
import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';

const TagsInput = () => {
  const {searchTags} = useActions()
  const {searchTagsData} = useAppState()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedTags, setSelectedTags] = useState<
    Omit<SearchTag, 'highlighted'>[]
  >([]);
  const [tagListIsHidden, setTagListIsHidden] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const tagsInputRef = useClickAway<HTMLFieldSetElement>(() => {
    setTagListIsHidden(true);
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const processSelectedTag = (id: number) => {
    const tag = selectedTags.find((selectedTag) => selectedTag.id == id);
    if (!tag) {
      const resultTag = searchTagsData.find((result) => result.id === id);
      if (resultTag) {
        setSelectedTags([...selectedTags, resultTag]);
      }
    } else {
      setSelectedTags([...selectedTags].filter((tags) => tags.id != id));
    }
  };

  const deleteSelectedTag = (id: number) => {
    const tag = selectedTags.find((selectedTag) => selectedTag.id == id);
    if (tag) {
      setSelectedTags([...selectedTags].filter((tags) => tags.id != id));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp') {
      setHighlightIndex((prev) => Math.max(0, prev - 1));
    } else if (e.code === 'ArrowDown') {
      setHighlightIndex((prev) => Math.min(searchTagsData.length - 1, prev + 1));
    } else if (e.code === 'Enter') {
      e.preventDefault();
      processSelectedTag(searchTagsData[highlightIndex].id);
    }
  };

  useEffect(() => {
    const searchTag = async () => {
      setIsSearching(true);
      if (debouncedSearchTerm) {
        setHighlightIndex(0);
        searchTags(debouncedSearchTerm);
      } else {
        setTagListIsHidden(true);
      }
      setIsSearching(false);
    };
    searchTag();
  }, [debouncedSearchTerm, searchTags]);
  useEffect(() => {
    if (searchTagsData.length) {
      setTagListIsHidden(false);
    }
  }, [searchTagsData]);
  return (
    <fieldset className="mb-5" ref={tagsInputRef}>
      <label
        htmlFor="tags-input"
        className="block mb-2 text-sm font-medium text-gray-90">
        Tags
      </label>
      <div className="flex flex-wrap items-center justify-start w-full h-auto border bg-gray-50 border-gray-30">
        <ul
          className={clsx(
            'flex justify-start items-center gap-2 flex-wrap p-2',
            selectedTags.length < 1 && 'hidden'
          )}>
          {selectedTags.map((tag) => (
            <li
              onClick={() => deleteSelectedTag(tag.id)}
              className="text-[12px] p-1 text-center text-white rounded-md bg-slate-600 cursor-pointer"
              key={tag.id}>
              {tag.name}
            </li>
          ))}
        </ul>
        <div className="relative w-full">
          <input
            type="text"
            id="tags-input"
            defaultValue={searchTerm}
            onChange={handleChange}
            placeholder="Enter tags separated by comma"
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none w-full"
            onFocus={() => searchTagsData.length && setTagListIsHidden(false)}
            onKeyDown={handleKeyDown}
            onBlur={() => setHighlightIndex(-1)}
            autoComplete="off"
          />
          <ul
            className={clsx(
              'sticky left-0 z-10 flex flex-col items-start justify-start w-full gap-1 bg-white top-[50px] max-h-[55vh] overflow-y-auto shadow-md',
              tagListIsHidden && 'hidden'
            )}>
            {searchTagsData.map(({ name, id }, index) => (
              <li
                className={clsx(
                  'block w-full p-1 text-xs cursor-pointer',
                  selectedTags.find((tag) => tag.id === id) && 'bg-orange-100',
                  index === highlightIndex && 'bg-yellow-200'
                )}
                onClick={() => processSelectedTag(id)}
                key={id}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isSearching && 'Searching...'}
    </fieldset>
  );
};

export default TagsInput;
