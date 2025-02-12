import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface InquiryListHeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const InquiryListHeader: React.FC<InquiryListHeaderProps> = ({
  onSearchChange,
  searchQuery,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            بحث
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FaSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder="بحث..."
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryListHeader;
