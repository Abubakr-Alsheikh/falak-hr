import React from "react";
import { FaSearch } from "react-icons/fa";

interface TableHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  rightSection?: React.ReactNode;
  title?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  searchQuery,
  onSearchChange,
  rightSection,
  title,
}) => {
  return (
    <div className="space-y-3 p-4">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-x-4 md:space-y-0">
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
                placeholder="بحث"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                required
              />
            </div>
          </form>
        </div>

        {/* Right Section (for buttons, etc.) */}
        {rightSection && (
          <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            {rightSection}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
