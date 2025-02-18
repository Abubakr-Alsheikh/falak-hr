// src/pages/dashboard/UserPage.tsx
import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import useUsers from "@hooks/useUsers";
import { userService } from "@api/userService";
import Table from "@components/common/dashboard/page/Table";
import Pagination from "@components/common/dashboard/page/Pagination";
import TableHeader from "@components/common/dashboard/page/TableHeader";
import ErrorDisplay from "@components/common/dashboard/page/ErrorDisplay";
import { useAuth } from "@contexts/AuthContext";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { UserProfile } from "@/types/user";
import UserListItem from "@/components/dashboard/users/UserListItem";
import CreateUserModal from "@/components/dashboard/users/Modals/CreateUserModal";
import UpdateUserModal from "@/components/dashboard/users/Modals/UpdateUserModal";
import ReadUserModal from "@/components/dashboard/users/Modals/ReadUserModal";
import DeleteUserModal from "@/components/dashboard/users/Modals/DeleteUserModal";

const UserPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { logout } = useAuth();

  const {
    users,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshUsers,
    updateParams, // Use the updateParams function from the hook
  } = useUsers({ page: 1, search: "" }); // Initial params

  const handleSearchChange = useCallback(
    (query: string) => {
      // Update the search parameter and reset the page to 1
      updateParams({ search: query, page: 1 });
    },
    [updateParams]
  );

  const handleCreateUser = useCallback(async () => {
    try {
      refreshUsers();
      setIsCreateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error creating company:", error);
    }
  }, [logout, refreshUsers]);

  const handleUpdateUser = useCallback(async () => {
    try {
      refreshUsers();
      setIsUpdateModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error updating company:", error);
    }
  }, [logout, refreshUsers]);

  const handleConfirmDeleteUser = useCallback(async () => {
    if (!selectedUser) return;
    try {
      await userService.deleteUser(selectedUser.id);
      refreshUsers();
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
      }
      console.error("Error deleting company:", error);
    }
  }, [logout, refreshUsers, selectedUser]);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenUpdateModal = (user: UserProfile) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleOpenReadModal = (user: UserProfile) => {
    setSelectedUser(user);
    setIsReadModalOpen(true);
  };
  const handleCloseReadModal = () => setIsReadModalOpen(false);
  const handleOpenDeleteModal = (user: UserProfile) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handlePageChange = useCallback(
    (newPage: number) => {
      // Update the page parameter
      updateParams({ page: newPage });
    },
    [updateParams]
  );

  // Error Handling Display
  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshUsers} />;
  }

  // Define the table header
  const renderHeader = () => (
    <>
      <th scope="col" className="px-4 py-4">
        اسم المستخدم
      </th>
      <th scope="col" className="px-4 py-3">
        البريد الإلكتروني
      </th>
      <th scope="col" className="px-4 py-3">
        الدور
      </th>
      <th scope="col" className="px-4 py-3">
        القسم
      </th>
      <th scope="col" className="px-4 py-3">
        المسمى الوظيفي
      </th>
      <th scope="col" className="px-4 py-3">
        الإجراءات
      </th>
    </>
  );

  // Define how to render each row
  const renderRow = (user: UserProfile) => (
    <UserListItem
      key={user.id}
      user={user}
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
            searchQuery={""} //Removed the searchQuery state variable
            onSearchChange={handleSearchChange}
            title="المستخدمون"
            rightSection={
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <FaPlus className="ml-2 h-3.5 w-3.5" />{" "}
                {/* Margins adjusted for RTL */}
                إضافة مستخدم
              </button>
            }
          />
          <Table
            items={users}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا يوجد مستخدمون لعرضهم."
            colSpan={6}
          />
          <Pagination
            totalCount={totalCount}
            currentPage={1} //Removed currentPage state variable
            itemsPerPage={DEFAULT_PAGE_SIZE}
            onPageChange={handlePageChange}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
          />
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateUser}
      />
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateUser}
        user={selectedUser}
      />
      <ReadUserModal
        isOpen={isReadModalOpen}
        onClose={handleCloseReadModal}
        user={selectedUser}
        onEdit={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteUser}
      />
    </section>
  );
};

export default UserPage;
