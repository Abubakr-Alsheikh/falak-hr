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
import useProjects from "@/hooks/useProjects";
import { Project } from "@/types/project";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  DataTableToolbar,
  DataTable,
  DataTablePagination,
  ActionsDropdown,
} from "@/components/common/dashboard/table";
import {
  CreateProjectModal,
  DeleteProjectModal,
  ReadProjectModal,
  UpdateProjectModal,
} from "@/pages/dashboard/projects/Modals";
import { useModal } from "@/hooks/useModal";
import { useSearchParams } from "react-router-dom";

const COLUMN_LABELS: Record<string, string> = {
  name: "اسم المشروع",
  description: "الوصف",
  manager_name: "اسم المدير",
  start_date: "تاريخ البداية",
  end_date: "تاريخ النهاية",
  status: "الحالة",
};

const ProjectPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("company"); // Get company ID from query parameter

  const {
    projects,
    loading,
    error,
    totalCount,
    refreshProjects,
    nextPageUrl,
    previousPageUrl,
  } = useProjects({
    page: currentPage,
    search: searchQuery,
    ordering:
      sorting.length > 0
        ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}`
        : "-created_at",
    company: companyId ? parseInt(companyId, 10) : undefined,
  });

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<Project>();

  const handleActionComplete = useCallback(() => {
    refreshProjects();
  }, [refreshProjects]);

  // Reset page to 1 when search query or sorting changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting]);

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      ...Object.entries(COLUMN_LABELS).map(([accessorKey, header]) => ({
        accessorKey,
        header: ({ column }: { column: Column<Project> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {header} <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<Project> }) => {
          const value = row.getValue(accessorKey);
          return <div>{String(value ?? "")}</div>;
        },
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
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshProjects} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="المشاريع"
          addButtonText="إضافة مشروع"
          searchPlaceholder="ابحث عن مشروع..."
          onAddClick={() =>
            openModal("create", undefined, {
              company: companyId ? parseInt(companyId, 10) : undefined,
            })
          }
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={projects}
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
          noDataMessage="لا توجد مشاريع لعرضها."
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
      <CreateProjectModal
        isOpen={modalState.create}
        onClose={() => closeModal("create")}
        onCreate={handleActionComplete}
        companyId={modalState.create ? modalState.props?.company : undefined}
      />
      <ReadProjectModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        project={selectedItem}
        onEdit={() => openModal("update", selectedItem!)}
        onDelete={() => openModal("delete", selectedItem!)}
      />
      <UpdateProjectModal
        isOpen={modalState.update}
        onClose={() => closeModal("update")}
        onUpdate={handleActionComplete}
        project={selectedItem}
      />
      <DeleteProjectModal
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        onConfirm={handleActionComplete}
        project={selectedItem}
      />
    </section>
  );
};

export default ProjectPage;
