import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import useProjects from "@hooks/useProjects";
import { projectService } from "@api/projectService";
import Table from "@components/common/dashboard/page/Table";
import Pagination from "@components/common/dashboard/page/Pagination";
import ProjectListItem from "@/pages/dashboard/projects/ProjectListItem";
import TableHeader from "@/components/common/dashboard/page/TableHeader";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import { useAuth } from "@contexts/AuthContext";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { Project } from "@/types/project";
import { useSearchParams } from "react-router-dom";

import {
  CreateProjectModal,
  DeleteProjectModal,
  ReadProjectModal,
  UpdateProjectModal,
} from "@/pages/dashboard/projects/Modals"; // Import modals

const ProjectPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("company"); // Get company ID from query parameter

  const {
    projects,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshProjects,
  } = useProjects({
    page: currentPage,
    search: searchQuery,
    company: companyId ? parseInt(companyId, 10) : undefined,
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on search
  }, []);

  const handleCreateProject = async () => {
    try {
      refreshProjects();
      setIsCreateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error creating project:", error);
    }
  };
  const handleUpdateProject = async () => {
    try {
      refreshProjects();
      setIsUpdateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error updating project:", error);
    }
  };
  const handleConfirmDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      await projectService.deleteProject(selectedProject.id);
      refreshProjects();
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error deleting project:", error);
    }
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenUpdateModal = (project: Project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleOpenReadModal = (project: Project) => {
    setSelectedProject(project);
    setIsReadModalOpen(true);
  };
  const handleCloseReadModal = () => setIsReadModalOpen(false);
  const handleOpenDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Error Handling Display
  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshProjects} />;
  }

  // Define the table header
  const renderHeader = () => (
    <>
      <th scope="col" className="px-4 py-4">
        اسم المشروع
      </th>
      <th scope="col" className="px-4 py-3">
        الوصف
      </th>
      <th scope="col" className="px-4 py-3">
        اسم المدير
      </th>
      <th scope="col" className="px-4 py-3">
        تاريخ البداية
      </th>
      <th scope="col" className="px-4 py-3">
        تاريخ النهاية
      </th>
      <th scope="col" className="px-4 py-3">
        الحالة
      </th>
      <th scope="col" className="px-4 py-3">
        <span className="sr-only">الإجراءات</span>
      </th>
    </>
  );

  // Define how to render each row
  const renderRow = (project: Project) => (
    <ProjectListItem
      key={project.id}
      project={project}
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
          <TableHeader
            title="المشاريع"
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            rightSection={
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                إضافة مشروع
                <FaPlus className="mr-2 h-3.5 w-3.5" />{" "}
              </button>
            }
          />
          <Table
            items={projects}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا توجد مشاريع لعرضها."
            colSpan={7} // Adjusted colSpan for the added columns
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
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateProject}
        companyId={companyId ? parseInt(companyId, 10) : undefined} // Pass company ID
      />
      <UpdateProjectModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateProject}
        project={selectedProject}
      />
      <ReadProjectModal
        isOpen={isReadModalOpen}
        onClose={handleCloseReadModal}
        project={selectedProject}
        onEdit={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
      />
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProject}
      />
    </section>
  );
};

export default ProjectPage;
