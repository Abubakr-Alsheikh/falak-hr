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

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error: any) {
        if (error.message === "Session expired. Please log in again.") {
          logout();
        }
        setError(error.message || "فشل في جلب الشركات.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, [logout]);

  // Filter and paginate companies
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // --- Modal Handlers ---
  const handleAddCompany = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateCompany = async (newCompany: Omit<Company, "id">) => {
    setIsLoading(true);
    setError(null);
    try {
      const createdCompany = await createCompany(newCompany);
      setCompanies([...companies, createdCompany]); // Update the list of companies
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
      const updated = await updateCompany(updatedCompany.id, updatedCompany);
      setCompanies(companies.map((c) => (c.id === updated.id ? updated : c)));
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
        setCompanies(companies.filter((c) => c.id !== selectedCompany.id));
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
                        } top-0 left-24 absolute z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
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
                {indexOfFirstCompany + 1}-
                {Math.min(indexOfLastCompany, filteredCompanies.length)}
              </span>
              من
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredCompanies.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-0 flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">السابق</span>
                  <FaChevronRight className="h-5 w-5" />
                </button>
              </li>
              {Array.from(
                {
                  length: Math.ceil(
                    filteredCompanies.length / companiesPerPage
                  ),
                },
                (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                        currentPage === i + 1
                          ? "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredCompanies.length / companiesPerPage)
                  }
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
