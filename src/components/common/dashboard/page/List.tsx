import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ListProps<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  renderHeader: () => React.ReactNode;
  renderRow: (item: T, index: number) => React.ReactNode;
  isLoading: boolean;
  noDataMessage?: string; // Add a message for when there's no data
}

const List = <T,>({
  items,
  totalCount,
  currentPage,
  itemsPerPage,
  onPageChange,
  nextPageUrl,
  previousPageUrl,
  renderHeader,
  renderRow,
  isLoading,
  noDataMessage = "No data available.", // Default message
}: ListProps<T>) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getPageNumbers = () => {
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const goToNextPage = () => {
    if (nextPageUrl) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (previousPageUrl) {
      onPageChange(currentPage - 1);
    }
  };

  const paginate = (pageNumber: number | string) => {
    if (typeof pageNumber === "number") {
      onPageChange(pageNumber);
    }
  };

  // Disable buttons based on *current page* and total pages, not just URLs.
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages || totalPages === 0;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary-700"></div>
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <React.Fragment key={index}>
                  {renderRow(item, index)}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  {noDataMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav
        className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          عرض
          <span className="font-semibold text-gray-900 dark:text-white">
            {itemsPerPage === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalCount)}
          </span>
          من
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalCount}
          </span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <button
              onClick={goToPreviousPage}
              disabled={isPreviousDisabled}
              className="mr-0 flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:opacity-80" // Added disabled styles
            >
              <span className="sr-only">السابق</span>
              <FaChevronRight className="h-5 w-5" />
            </button>
          </li>
          {getPageNumbers().map((pageNumber, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                  currentPage === pageNumber
                    ? "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={goToNextPage}
              disabled={isNextDisabled}
              className="flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:opacity-80" // Added disabled styles
            >
              <span className="sr-only">التالي</span>
              <FaChevronLeft className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default List;
