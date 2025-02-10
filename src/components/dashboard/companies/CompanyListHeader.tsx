import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

interface CompanyListHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddCompany: () => void;
}

const CompanyListHeader: React.FC<CompanyListHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddCompany,
}) => {
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
              placeholder="بحث"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <button
          type="button"
          onClick={onAddCompany}
          className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <span className="ml-2">إضافة شركة</span>
          <FaPlus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CompanyListHeader;
