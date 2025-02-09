import { useMemo, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { MultiValue } from 'react-select';
import debounce from '@/utils/debounce';
import { MultiSelectTag } from '@/types';

type MultiSelectInputProp = {
  onChange: (selectedTags: MultiSelectTag[]) => void;
  value?: MultiSelectTag[];
  placeholder?: string;
  label?: string;
  loadOptions: (inputString: string) => Promise<MultiSelectTag[]>;
};

const MultiSelectInput: React.FC<MultiSelectInputProp> = ({
  onChange,
  value = [],
  placeholder = 'Enter Tags...',
  label = 'Tags',
  loadOptions
}) => {
  const [selectedTags, setSelectedTags] = useState<MultiSelectTag[]>(value);

  const handleChange = (newValue: MultiValue<MultiSelectTag>) => {
    const tags = newValue as MultiSelectTag[];
    setSelectedTags(tags);
    onChange(tags);
  };

  const debouncedLoadOptions = useMemo(
    () =>
      debounce(
        (inputValue: string, callback: (options: MultiSelectTag[]) => void) => {
          loadOptions(inputValue).then(callback);
        },
        300
      ),
    [loadOptions]
  );

  return (
    <div className="my-3">
      <label
        htmlFor="tags-input"
        className="block mb-2 text-sm font-medium text-gray-90">
        {label}
      </label>
      <AsyncSelect
        isMulti
        loadOptions={debouncedLoadOptions}
        value={selectedTags}
        onChange={handleChange}
        placeholder={placeholder}
        className='border'
      />
    </div>
  );
};

export default MultiSelectInput;
