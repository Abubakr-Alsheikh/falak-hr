import React, { useState, useEffect } from "react";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@api/company";
import { useAuth } from "@contexts/AuthContext";
import { Company } from "@/types/models";
import LoadingScreen from "@components/common/LoadingScreen";
import CompanyListHeader from "@components/dashboard/companies/CompanyListHeader";
import CompanyList from "@components/dashboard/companies/CompanyList";
import CreateCompanyModal from "@components/dashboard/companies/Modals/CreateCompanyModal";
import UpdateCompanyModal from "@components/dashboard/companies/Modals/UpdateCompanyModal";
import ReadCompanyModal from "@components/dashboard/companies/Modals/ReadCompanyModal";
import DeleteCompanyModal from "@components/dashboard/companies/Modals/DeleteCompanyModal";

const CompanyListPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [companiesPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Fetch Companies
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
  }, [currentPage, companiesPerPage, logout]);

  const handleCreateCompany = async (newCompany: Omit<Company, "id">) => {
    setIsLoading(true);
    setError(null);
    try {
      await createCompany(newCompany);
      // Re-fetch companies to update the list including the new company
      const response = await getCompanies(currentPage, companiesPerPage);
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

  const handleUpdateCompany = async (updatedCompany: Company) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateCompany(updatedCompany.id, updatedCompany);
      // Re-fetch companies (or optimistically update)
      const response = await getCompanies(currentPage, companiesPerPage);
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

  const handleConfirmDeleteCompany = async () => {
    if (!selectedCompany) return;
    setIsLoading(true);
    setError(null);
    try {
      await deleteCompany(selectedCompany.id);
      // Re-fetch companies (or optimistically update)
      const response = await getCompanies(currentPage, companiesPerPage);
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
          <CompanyListHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddCompany={handleOpenCreateModal}
          />
          <CompanyList
            companies={companies}
            searchQuery={searchQuery}
            totalCount={totalCount}
            currentPage={currentPage}
            companiesPerPage={companiesPerPage}
            onPageChange={setCurrentPage}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            onEdit={handleOpenUpdateModal}
            onView={handleOpenReadModal}
            onDelete={handleOpenDeleteModal}
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
