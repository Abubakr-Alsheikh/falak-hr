import React, { useState, useEffect, useRef } from "react";
import {
  FaPlus,
  FaEllipsisH,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTimes,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@api/company";
import LoadingScreen from "@components/common/LoadingScreen";
import { useAuth } from "@hooks/useAuth";
import { Company } from "@/types/models";
import CreateCompanyModal from "./CreateCompanyModal";
import UpdateCompanyModal from "./UpdateCompanyModal";
import ReadCompanyModal from "./ReadCompanyModal";
import DeleteCompanyModal from "./DeleteCompanyModal";

const CompanyListPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [companiesPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  // Dropdown State
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Pagination State from API
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Function to generate an array of page numbers to display
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

  // Fetch companies on component mount or page/pageSize change
  useEffect(() => {
    const fetchCompaniesData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCompanies(currentPage, companiesPerPage);
        setCompanies(response.results);
        setTotalCount(response.count);
        setNextPageUrl(response.next);
        setPreviousPageUrl(response.previous);
      } catch (error: any) {
        if (error.message === "Session expired. Please log in again.") {
          logout();
        }
        setError(error.message || "فشل في جلب الشركات.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompaniesData();
  }, [currentPage, companiesPerPage, logout]); // зависимость от currentPage и companiesPerPage

  // Filter companies (still client-side for search, can be moved to backend if needed for large datasets)
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentCompanies = filteredCompanies; // No need to slice, API handles pagination

  // Change page - now directly interacts with backend pagination
  const paginate = (pageNumber: number | string) => {
    if (
      typeof pageNumber === "number" &&
      pageNumber > 0 &&
      pageNumber <= Math.ceil(totalCount / companiesPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const goToNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1); // Simple increment, useEffect will handle fetching
    }
  };

  const goToPreviousPage = () => {
    if (previousPageUrl && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Simple decrement, useEffect will handle fetching
    }
  };

  // --- Modal Handlers ---
  const handleAddCompany = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateCompany = async (newCompany: Omit<Company, "id">) => {
    setIsLoading(true);
    setError(null);
    try {
      await createCompany(newCompany);
      // Re-fetch companies to update the list including the new company, or optimistically update frontend state
      const response = await getCompanies(currentPage, companiesPerPage); // Re-fetch current page
      setCompanies(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
      setIsCreateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(error.message || "فشل في إنشاء الشركة.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateCompany = async (updatedCompany: Company) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateCompany(updatedCompany.id, updatedCompany);
      // Re-fetch companies to update the list with updated company, or optimistically update frontend state
      const response = await getCompanies(currentPage, companiesPerPage); // Re-fetch current page
      setCompanies(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
      setIsUpdateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(error.message || "فشل في تحديث الشركة.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsReadModalOpen(true);
  };

  const handleDeleteCompany = (companyId: number) => {
    setSelectedCompany(companies.find((c) => c.id === companyId) || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteCompany = async () => {
    if (selectedCompany) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteCompany(selectedCompany.id);
        // Re-fetch companies to update the list after deletion
        const response = await getCompanies(currentPage, companiesPerPage); // Re-fetch current page
        setCompanies(response.results);
        setTotalCount(response.count);
        setNextPageUrl(response.next);
        setPreviousPageUrl(response.previous);
        setIsDeleteModalOpen(false);
      } catch (error: any) {
        if (error.message === "Session expired. Please log in again.") {
          logout();
        }
        setError(error.message || "فشل في حذف الشركة.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleDropdown = (companyId: number) => {
    setOpenDropdown((prev) => (prev === companyId ? null : companyId));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        const dropdownRef = dropdownRefs.current.get(openDropdown);
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500"
        >
          إعادة التحميل
        </button>
      </div>
    );
  }

  return (
    <section
      className="bg-gray-50 p-3 antialiased dark:bg-gray-900 sm:p-5"
      dir="rtl"
    >
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <button
                type="button"
                onClick={handleAddCompany}
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span className="ml-2">إضافة شركة</span>
                <FaPlus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    اسم الشركة
                  </th>
                  <th scope="col" className="px-4 py-3">
                    العنوان
                  </th>
                  <th scope="col" className="px-4 py-3">
                    البريد الإلكتروني للتواصل
                  </th>
                  <th scope="col" className="px-4 py-3">
                    رقم الهاتف للتواصل
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">الإجراءات</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                    >
                      {company.name}
                    </th>
                    <td className="px-4 py-3">{company.address}</td>
                    <td className="px-4 py-3">{company.contact_email}</td>
                    <td className="px-4 py-3">{company.contact_phone}</td>
                    <td className="relative flex items-center justify-start px-4 py-3">
                      <button
                        onClick={() => toggleDropdown(company.id)}
                        className="dark:hover-bg-gray-800 inline-flex items-center rounded-lg p-1.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                        type="button"
                      >
                        <FaEllipsisH className="h-5 w-5" />
                      </button>
                      <div
                        ref={(el) => {
                          if (el) dropdownRefs.current.set(company.id, el);
                        }}
                        className={`${
                          openDropdown === company.id ? "" : "hidden"
                        } bottom-0 left-24 absolute z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
                      >
                        <ul
                          className="py-1 text-sm"
                          aria-labelledby={`company-${company.id}-dropdown-button`}
                        >
                          <li>
                            <button
                              onClick={() => handleEditCompany(company)}
                              className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <span className="ml-2">تعديل</span>
                              <FaEdit className="h-4 w-4" />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleViewCompany(company)}
                              className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <span className="ml-2"> معاينة</span>
                              <FaTimes className="h-4 w-4" />
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDeleteCompany(company.id)}
                              className="flex w-full items-center px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-400"
                            >
                              <span className="ml-2"> حذف</span>
                              <FaTrashAlt className="h-4 w-4" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
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
                {companies.length > 0
                  ? (currentPage - 1) * companiesPerPage + 1
                  : 0}
                -{Math.min(currentPage * companiesPerPage, totalCount)}
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
        </div>
      </div>
      {/* Modal Components */}
      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateCompany}
      />
      <UpdateCompanyModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdateCompany}
        onDelete={handleDeleteCompany}
        company={selectedCompany}
      />
      <ReadCompanyModal
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
        company={selectedCompany}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
      />
      <DeleteCompanyModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteCompany}
      />
    </section>
  );
};

export default CompanyListPage;
