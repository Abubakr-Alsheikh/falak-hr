import React, { useState, useCallback } from "react";
import useCompanies from "@hooks/useCompanies";
import { companyService } from "@api/companyService";
import { Company } from "@/types/models";
import CompanyListHeader from "@components/dashboard/companies/CompanyListHeader";
import CompanyList from "@components/dashboard/companies/CompanyList";
import CreateCompanyModal from "@components/dashboard/companies/Modals/CreateCompanyModal";
import UpdateCompanyModal from "@components/dashboard/companies/Modals/UpdateCompanyModal";
import ReadCompanyModal from "@components/dashboard/companies/Modals/ReadCompanyModal";
import DeleteCompanyModal from "@components/dashboard/companies/Modals/DeleteCompanyModal";
import { useAuth } from "@contexts/AuthContext";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";

const CompanyListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
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
  } = useCompanies({ page: currentPage, search: localSearchQuery });

  // Debounce function
  const debounce = (func: (query: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(query);
      }, delay);
    };
  };
  const handleSearchChange = useCallback(
    debounce((query: string) => {
      setCurrentPage(1);
      setLocalSearchQuery(query);
    }, 500),
    []
  );

  const handleLocalSearchChange = (query: string) => {
    setLocalSearchQuery(query);
    handleSearchChange(query);
  };

  const handleCreateCompany = async (newCompany: Omit<Company, "id">) => {
    try {
      await companyService.createCompany(newCompany);
      refreshCompanies(); // Use the refresh function
      setIsCreateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error creating company:", error);
    }
  };

  const handleUpdateCompany = async (updatedCompany: Company) => {
    try {
      await companyService.updateCompany(updatedCompany.id, updatedCompany);
      refreshCompanies(); // Use the refresh function
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
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <button onClick={refreshCompanies} className="text-blue-500">
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
          <CompanyListHeader
            onSearchChange={handleLocalSearchChange}
            searchQuery={localSearchQuery}
            onAddCompany={handleOpenCreateModal}
          />
          <CompanyList
            companies={companies}
            totalCount={totalCount}
            currentPage={currentPage}
            companiesPerPage={DEFAULT_PAGE_SIZE}
            onPageChange={handlePageChange}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            onEdit={handleOpenUpdateModal}
            onView={handleOpenReadModal}
            onDelete={handleOpenDeleteModal}
            isLoading={loading}
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
        onDelete={handleOpenDeleteModal}
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

export default CompanyListPage;
