import React, { useState, useCallback, useMemo } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  Column,
  Row,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUsers from "@/hooks/useUsers";
import { UserProfile, User } from "@/types/user";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  DataTableToolbar,
  DataTable,
  DataTablePagination,
  ActionsDropdown,
} from "@/components/common/dashboard/table";
import {
  CreateUserModal,
  DeleteUserModal,
  ReadUserModal,
  UpdateUserModal,
} from "@/pages/dashboard/users/Modals";
import { useModal } from "@/hooks/useModal";

const COLUMN_LABELS: Record<string, string> = {
  user: "اسم المستخدم", // Now refers to the nested User object
  company: "الشركة",
  role: "الدور",
  phone_number: "رقم الهاتف",
  department: "القسم",
  job_title: "المسمى الوظيفي",
};

const UserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const {
    users,
    loading,
    error,
    totalCount,
    refreshUsers,
    nextPageUrl,
    previousPageUrl,
    updateParams,
  } = useUsers({ page: currentPage, search: searchQuery });

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<UserProfile>();

  const handleActionComplete = useCallback(() => {
    refreshUsers();
  }, [refreshUsers]);

  React.useEffect(() => {
    setCurrentPage(1);
    updateParams({ page: currentPage });
  }, [searchQuery, sorting, currentPage, updateParams]);

  const columns = useMemo<ColumnDef<UserProfile>[]>(
    () => [
      ...Object.entries(COLUMN_LABELS).map(([accessorKey, header]) => ({
        accessorKey,
        header: ({ column }: { column: Column<UserProfile> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {header} <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<UserProfile> }) => {
          const value = row.original[accessorKey as keyof UserProfile];

          // 1. Handle undefined/null first:
          if (value === null || value === undefined) {
            return <div>-</div>;
          }

          // 2. Handle the User object:
          if (accessorKey === "user") {
            if (typeof value === "object" && "username" in value) {
              return <div>{(value as User).username}</div>;
            } else {
              // Debugging: Log the unexpected value
              console.warn("Unexpected value for 'user':", value);
              return <div>Error: Invalid User Data</div>; // Or some other fallback
            }
          }

          //3. handle company
          if (accessorKey === "company" && typeof value === "number") {
            return <div>{value}</div>; // Or fetch and display company name
          }

          // 4. Handle strings and numbers directly:
          if (typeof value === "string" || typeof value === "number") {
            return <div>{value}</div>;
          }

          return <div>Error: Unexpected Data Type</div>;
        },
        enableColumnFilter: true,
      })),
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
          <ActionsDropdown
            data={row.original}
            actions={[
              {
                label: "معاينة",
                onClick: () => openModal("read", row.original),
                icon: <Eye className="h-4 w-4" />,
              },
              {
                label: "تعديل",
                onClick: () => openModal("update", row.original),
                icon: <Edit className="h-4 w-4" />,
              },
              {
                label: "حذف",
                onClick: () => openModal("delete", row.original),
                icon: <Trash2 className="h-4 w-4" />,
                className: "text-red-500",
              },
            ]}
          />
        ),
      },
    ],
    [openModal]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / DEFAULT_PAGE_SIZE),
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshUsers} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="المستخدمون"
          addButtonText="إضافة مستخدم"
          searchPlaceholder="ابحث عن مستخدم..."
          onAddClick={() => openModal("create")}
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={users}
          columns={columns}
          isLoading={loading}
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          sorting={sorting}
          setSorting={setSorting}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          pageSize={DEFAULT_PAGE_SIZE}
          noDataMessage="لا يوجد مستخدمون لعرضهم."
        />
        <DataTablePagination
          currentPage={currentPage}
          totalCount={totalCount}
          itemsPerPage={DEFAULT_PAGE_SIZE}
          onPreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNextPage={() => setCurrentPage((prev) => prev + 1)}
          canPreviousPage={!!previousPageUrl}
          canNextPage={!!nextPageUrl}
          isLoading={loading}
        />
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={modalState.create}
        onClose={() => closeModal("create")}
        onCreate={handleActionComplete}
      />
      <ReadUserModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        user={selectedItem}
        onEdit={() => openModal("update", selectedItem!)}
        onDelete={() => openModal("delete", selectedItem!)}
      />
      <UpdateUserModal
        isOpen={modalState.update}
        onClose={() => closeModal("update")}
        onUpdate={handleActionComplete}
        user={selectedItem}
      />
      <DeleteUserModal
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        onConfirm={handleActionComplete}
        user={selectedItem}
      />
    </section>
  );
};

export default UserPage;
