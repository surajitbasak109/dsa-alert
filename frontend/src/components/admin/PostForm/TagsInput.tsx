import { useClickAway } from '@/hooks/useClickAway';
import useDebounce from '@/hooks/useDebounce';
import { SearchTag } from '@/types';
import searchTags from '@/utils/searchTags';
import clsx from 'clsx';
import { FormEvent, useEffect, useState } from 'react';

const TagsInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<SearchTag[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [tagListIsHidden, setTagListIsHidden] = useState(true);
  const tagsInputRef = useClickAway<HTMLFieldSetElement>(() => {
    setTagListIsHidden(true);
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleTagClick = (id: number) => {
    if (!selectedTagIds.includes(id)) {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  useEffect(() => {
    const searchTag = async () => {
      let results: SearchTag[] = [];
      setIsSearching(true);
      if (debouncedSearchTerm) {
        const data = await searchTags(debouncedSearchTerm);
        results = data || [];
      } else {
        setTagListIsHidden(true);
      }
      setIsSearching(false);
      setResults(results);
      if (results.length) {
        setTagListIsHidden(false);
      }
    };
    searchTag();
  }, [debouncedSearchTerm]);
  return (
    <fieldset className="relative mb-5" ref={tagsInputRef}>
      <label
        htmlFor="tags-input"
        className="block mb-2 text-sm font-medium text-gray-90">
        Tags
      </label>
      <input
        type="text"
        id="tags-input"
        defaultValue={searchTerm}
        onChange={handleChange}
        placeholder="Enter tags separated by comma"
        className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-50 border border-gray-30"
        required
        onFocus={() => results.length && setTagListIsHidden(false)}
      />
      <ul
        className={clsx(
          'absolute left-0 z-10 flex flex-col items-start justify-start w-full gap-1 bg-white top-[70px] max-h-60 overflow-y-auto shadow-md',
          tagListIsHidden && 'hidden'
        )}>
        {results.map(({ name, id }) => (
          <li
            className="block w-full px-2 py-2 cursor-pointer"
            onClick={() => handleTagClick(id)}
            key={id}>
            {name}
          </li>
        ))}
      </ul>
      {isSearching && 'Searching...'}
      <div>{selectedTagIds.join(', ')}</div>
    </fieldset>
  );
};

export default TagsInput;
