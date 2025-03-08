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
import useTasks from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  DataTableToolbar,
  DataTable,
  DataTablePagination,
  ActionsDropdown,
} from "@/components/common/dashboard/table";
import {
  CreateTaskModal,
  DeleteTaskModal,
  ReadTaskModal,
  UpdateTaskModal,
} from "@/pages/dashboard/tasks/Modals";
import { useModal } from "@/hooks/useModal";
import { useSearchParams } from "react-router-dom";
import { UserProfile } from "@/types/user"; // Import UserProfile

const COLUMN_LABELS: Record<string, string> = {
  title: "اسم المهمة",
  description: "الوصف",
  assigned_to: "الموظف",
  due_date: "تاريخ التسليم",
  status: "الحالة",
};

// Helper function outside the component
const getAssignedToNames = (assignedToDetails?: UserProfile[]) => {
  if (!assignedToDetails || assignedToDetails.length === 0) {
    return "لا يوجد";
  }
  return assignedToDetails
    .map((user) => user.user.username || "غير معروف")
    .join(", ");
};

const TaskPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchParams] = useSearchParams();

  // Get filter parameters from URL, with more robust handling
  const projectId = useMemo(
    () =>
      searchParams.get("project")
        ? Number(searchParams.get("project"))
        : undefined,
    [searchParams]
  );
  const assignedToId = useMemo(
    () =>
      searchParams.get("assigned_to")
        ? Number(searchParams.get("assigned_to"))
        : undefined,
    [searchParams]
  );
  const statusFilter = useMemo(
    () => searchParams.get("status") || undefined,
    [searchParams]
  );
  const ordering = useMemo(
    () => searchParams.get("ordering") || "-created_at",
    [searchParams]
  );

  const {
    tasks,
    loading,
    error,
    totalCount,
    refreshTasks,
    nextPageUrl,
    previousPageUrl,
  } = useTasks({
    page: currentPage,
    ordering,
    project: projectId,
    assigned_to: assignedToId,
    status: statusFilter,
  });

  const { openModal, closeModal, modalState, selectedItem } = useModal<Task>();

  const handleActionComplete = useCallback(() => {
    refreshTasks();
  }, [refreshTasks]);

  // Reset page to 1 when search query or sorting changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting, projectId, assignedToId, statusFilter]);

  // Column definitions
  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      ...Object.entries(COLUMN_LABELS).map(([accessorKey, header]) => ({
        accessorKey,
        header: ({ column }: { column: Column<Task> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {header} <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<Task> }) => {
          // Special handling for assigned_to (display names)
          if (accessorKey === "assigned_to") {
            return (
              <div>{getAssignedToNames(row.original.assigned_to_details)}</div>
            );
          }
          return <div>{row.getValue(accessorKey)}</div>;
        },
        enableColumnFilter: true, // Enable filtering on all columns (you might want to refine this)
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
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshTasks} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="المهام"
          addButtonText="إضافة مهمة"
          searchPlaceholder="ابحث عن مهمة..."
          onAddClick={() =>
            openModal("create", undefined, { projectId: projectId })
          } //Pass the projectId
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={tasks}
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
          noDataMessage="لا توجد مهام لعرضها."
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
      <CreateTaskModal
        isOpen={modalState.create}
        onClose={() => closeModal("create")}
        onCreate={handleActionComplete}
        projectId={projectId} // Pass projectId to CreateTaskModal
      />
      <ReadTaskModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        task={selectedItem}
        onEdit={() => openModal("update", selectedItem!)}
        onDelete={() => openModal("delete", selectedItem!)}
      />
      <UpdateTaskModal
        isOpen={modalState.update}
        onClose={() => closeModal("update")}
        onUpdate={handleActionComplete}
        task={selectedItem}
      />
      <DeleteTaskModal
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        onConfirm={handleActionComplete}
        task={selectedItem} // Pass the task to the delete modal
      />
    </section>
  );
};

export default TaskPage;
