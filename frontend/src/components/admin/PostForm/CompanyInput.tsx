import { useClickAway } from '@/hooks/useClickAway';
import useDebounce from '@/hooks/useDebounce';
import { useActions, useAppState } from '@/store';
import { CompanySearchType } from '@/types';
import clsx from 'clsx';
import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';

type CompanyInputProps = {
  onChange: (selectedCompanies: CompanySearchType[]) => void;
  value?: CompanySearchType[];
};

const CompanyInput = ({ onChange, value = [] }: CompanyInputProps) => {
  const {
    postAction: { searchCompanies }
  } = useActions();
  const { searchCompaniesData } = useAppState();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedCompanies, setSelectedCompanies] =
    useState<Omit<CompanySearchType, 'highlighted'>[]>(value);
  const [companyListIsHidden, setCompanyListIsHidden] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const CompanyInputRef = useClickAway<HTMLFieldSetElement>(() => {
    setCompanyListIsHidden(true);
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const processSelectedCompany = (id: number) => {
    const company = selectedCompanies.find((selectedCompany) => selectedCompany.id == id);
    if (!company) {
      const companyResult = searchCompaniesData.find((result) => result.id === id);
      if (companyResult) {
        const newCompanies = [...selectedCompanies, companyResult];
        setSelectedCompanies(newCompanies);
        onChange(newCompanies);
      }
    } else {
      const filteredCompanies = [...selectedCompanies].filter((companies) => companies.id != id);
      setSelectedCompanies(filteredCompanies);
      onChange(filteredCompanies);
    }
  };

  const deleteSelectedCompany = (id: number) => {
    const company = selectedCompanies.find((selectedCompany) => selectedCompany.id == id);
    if (company) {
      setSelectedCompanies([...selectedCompanies].filter((companies) => companies.id != id));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp') {
      setHighlightIndex((prev) => Math.max(0, prev - 1));
    } else if (e.code === 'ArrowDown') {
      setHighlightIndex((prev) =>
        Math.min(searchCompaniesData.length - 1, prev + 1)
      );
    } else if (e.code === 'Enter') {
      e.preventDefault();
      processSelectedCompany(searchCompaniesData[highlightIndex].id);
    } else if (
      e.code === 'Backspace' &&
      searchTerm.length === 0 &&
      selectedCompanies.length > 0
    ) {
      setSelectedCompanies(selectedCompanies.slice(0, -1));
    } else if (e.code === 'Tab') {
      setCompanyListIsHidden(true);
    }
  };

  useEffect(() => {
    const searchCompany = async () => {
      setIsSearching(true);
      if (debouncedSearchTerm) {
        setHighlightIndex(0);
        searchCompanies(debouncedSearchTerm);
      } else {
        setCompanyListIsHidden(true);
      }
      setIsSearching(false);
    };
    searchCompany();
  }, [debouncedSearchTerm, searchCompanies]);
  useEffect(() => {
    if (searchCompaniesData.length) {
      setCompanyListIsHidden(false);
    }
  }, [searchCompaniesData]);

  return (
    <fieldset className="mb-5" ref={CompanyInputRef}>
      <label
        htmlFor="companies-input"
        className="block mb-2 text-sm font-medium text-gray-90">
        Companies
      </label>
      <div className="flex flex-wrap items-center justify-start w-full h-auto border bg-gray-50 border-gray-30">
        <ul
          className={clsx(
            'flex justify-start items-center gap-2 flex-wrap p-2',
            selectedCompanies.length < 1 && 'hidden'
          )}>
          {selectedCompanies.map((company) => (
            <li
              onClick={() => deleteSelectedCompany(company.id)}
              className="text-[12px] px-3 py-1 text-center text-white rounded-md bg-slate-600 cursor-pointer"
              key={company.id}>
              {company.name}
            </li>
          ))}
        </ul>
        <div className="relative w-full">
          <input
            type="text"
            id="companies-input"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter companies separated by comma"
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none w-full"
            onFocus={() =>
              searchCompaniesData.length && setCompanyListIsHidden(false)
            }
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setHighlightIndex(-1);
            }}
            autoComplete="off"
          />
          <ul
            className={clsx(
              'sticky left-0 z-10 flex flex-col items-start justify-start w-full gap-1 bg-white top-[50px] h-auto overflow-y-auto shadow-md',
              companyListIsHidden && 'hidden'
            )}>
            {searchCompaniesData.map(({ name, id }, index) => (
              <li
                className={clsx(
                  'block w-full p-1 text-xs cursor-pointer',
                  selectedCompanies.find((company) => company.id === id) && 'bg-orange-100',
                  index === highlightIndex && 'bg-yellow-200'
                )}
                onClick={() => processSelectedCompany(id)}
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

export default CompanyInput;
