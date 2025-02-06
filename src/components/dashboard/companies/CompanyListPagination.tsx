import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CompanyListPaginationProps {
  totalCount: number;
  currentPage: number;
  companiesPerPage: number;
  onPageChange: (pageNumber: number) => void;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

const CompanyListPagination: React.FC<CompanyListPaginationProps> = ({
  totalCount,
  currentPage,
  companiesPerPage,
  onPageChange,
  nextPageUrl,
  previousPageUrl,
}) => {
  const getPageNumbers = () => {
    const totalPages = Math.ceil(totalCount / companiesPerPage);
    const visiblePages = 5; // Number of visible page numbers (adjust as needed)
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
        pages.push("..."); // Ellipsis for skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("..."); // Ellipsis for skipped pages
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
    if (
      typeof pageNumber === "number" &&
      pageNumber > 0 &&
      pageNumber <= Math.ceil(totalCount / companiesPerPage)
    ) {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav
      className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        عرض
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * companiesPerPage + 1}-
          {Math.min(currentPage * companiesPerPage, totalCount)}
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
            disabled={!previousPageUrl}
            className="mr-0 flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={goToNextPage}
            disabled={!nextPageUrl}
            className="flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">التالي</span>
            <FaChevronLeft className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default CompanyListPagination;
