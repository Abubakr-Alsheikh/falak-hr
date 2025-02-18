import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import useCompanies from "@hooks/useCompanies";
import { companyService } from "@api/companyService";
import Table from "@components/common/dashboard/page/Table";
import Pagination from "@components/common/dashboard/page/Pagination";
import CompanyListItem from "@components/dashboard/companies/CompanyListItem";
import HeaderHeader from "@/components/common/dashboard/page/TableHeader";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import { useAuth } from "@contexts/AuthContext";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { Company } from "@/types/company";
import {
  CreateCompanyModal,
  DeleteCompanyModal,
  ReadCompanyModal,
  UpdateCompanyModal,
} from "@/components/dashboard/companies/Modals";

const CompanyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Use searchQuery
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { logout } = useAuth();

  const {
    companies,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshCompanies,
  } = useCompanies({ page: currentPage, search: searchQuery }); // Use searchQuery

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on search
  }, []);

  const handleCreateCompany = async () => {
    try {
      refreshCompanies();
      setIsCreateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error creating company:", error);
    }
  };

  const handleUpdateCompany = async () => {
    try {
      refreshCompanies();
      setIsUpdateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error updating company:", error);
    }
  };

  const handleConfirmDeleteCompany = async () => {
    if (!selectedCompany) return;
    try {
      await companyService.deleteCompany(selectedCompany.id);
      refreshCompanies();
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error deleting company:", error);
    }
  };
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenUpdateModal = (company: Company) => {
    setSelectedCompany(company);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleOpenReadModal = (company: Company) => {
    setSelectedCompany(company);
    setIsReadModalOpen(true);
  };
  const handleCloseReadModal = () => setIsReadModalOpen(false);
  const handleOpenDeleteModal = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Error Handling Display
  if (error) {
    <ErrorDisplay message={error} onRetry={refreshCompanies} />;
  }

  // Define the table header
  const renderHeader = () => (
    <>
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
    </>
  );

  // Define how to render each row
  const renderRow = (company: Company) => (
    <CompanyListItem
      key={company.id}
      company={company}
      onEdit={handleOpenUpdateModal}
      onView={handleOpenReadModal}
      onDelete={handleOpenDeleteModal}
    />
  );

  return (
    <section
      className="bg-gray-50 p-3 antialiased dark:bg-gray-900 sm:p-5"
      dir="rtl"
    >
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <HeaderHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            title="الشركات"
            rightSection={
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                إضافة شركة
                <FaPlus className="mr-2 h-3.5 w-3.5" />
              </button>
            }
          />
          <Table
            items={companies}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا توجد شركات لعرضها."
            colSpan={5}
          />
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={DEFAULT_PAGE_SIZE}
            onPageChange={handlePageChange}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
          />
        </div>
      </div>

      {/* Modals */}
      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateCompany}
      />
      <UpdateCompanyModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateCompany}
        company={selectedCompany}
      />
      <ReadCompanyModal
        isOpen={isReadModalOpen}
        onClose={handleCloseReadModal}
        company={selectedCompany}
        onEdit={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
      />
      <DeleteCompanyModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteCompany}
      />
    </section>
  );
};

export default CompanyPage;
