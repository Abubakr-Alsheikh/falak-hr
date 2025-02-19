import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import useTasks from "@hooks/useTasks";
import { taskService } from "@api/taskService";
import Table from "@components/common/dashboard/page/Table";
import Pagination from "@components/common/dashboard/page/Pagination";
import TaskListItem from "@components/dashboard/tasks/TaskListItem";
import TableHeader from "@/components/common/dashboard/page/TableHeader";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import { useAuth } from "@contexts/AuthContext";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { Task } from "@/types/task";
import { useSearchParams } from "react-router-dom";

import {
  CreateTaskModal,
  DeleteTaskModal,
  ReadTaskModal,
  UpdateTaskModal,
} from "@/components/dashboard/tasks/Modals";

const TaskPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();

  // Get filter parameters from URL
  const projectId = searchParams.get("project");
  const assignedToId = searchParams.get("assigned_to");
  const statusFilter = searchParams.get("status");
  const ordering = searchParams.get("ordering") || "-created_at";

  const {
    tasks,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshTasks,
  } = useTasks({
    page: currentPage,
    ordering: ordering,
    project: projectId ? parseInt(projectId, 10) : undefined,
    assigned_to: assignedToId ? parseInt(assignedToId, 10) : undefined,
    status: statusFilter || undefined,
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query); // Keep this if you have a general search input
    setCurrentPage(1);
  }, []);

  const handleCreateTask = async () => {
    try {
      refreshTasks();
      setIsCreateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      refreshTasks();
      setIsUpdateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error updating task:", error);
    }
  };

  const handleConfirmDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      await taskService.deleteTask(selectedTask.id);
      refreshTasks();
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error deleting task:", error);
    }
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenUpdateModal = (task: Task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleOpenReadModal = (task: Task) => {
    setSelectedTask(task);
    setIsReadModalOpen(true);
  };
  const handleCloseReadModal = () => setIsReadModalOpen(false);
  const handleOpenDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshTasks} />;
  }

  const renderHeader = () => (
    <>
      <th scope="col" className="px-4 py-4">
        اسم المهمة
      </th>
      <th scope="col" className="px-4 py-3">
        الوصف
      </th>
      <th scope="col" className="px-4 py-3">
        الموظف
      </th>
      <th scope="col" className="px-4 py-3">
        تاريخ التسليم
      </th>
      <th scope="col" className="px-4 py-3">
        الحالة
      </th>
      <th scope="col" className="px-4 py-3">
        <span className="sr-only">الإجراءات</span>
      </th>
    </>
  );

  const renderRow = (task: Task) => (
    <TaskListItem
      key={task.id}
      task={task}
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
            title="المهام"
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            rightSection={
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                إضافة مهمة
                <FaPlus className="mr-2 h-3.5 w-3.5" />
              </button>
            }
          />

          <Table
            items={tasks}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا توجد مهام لعرضها."
            colSpan={6} // Number of columns in your TaskListItem
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
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateTask}
        projectId={projectId ? parseInt(projectId, 10) : undefined}
      />
      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateTask}
        task={selectedTask}
      />
      <ReadTaskModal
        isOpen={isReadModalOpen}
        onClose={handleCloseReadModal}
        task={selectedTask}
        onEdit={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
      />
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTask}
      />
    </section>
  );
};

export default TaskPage;
