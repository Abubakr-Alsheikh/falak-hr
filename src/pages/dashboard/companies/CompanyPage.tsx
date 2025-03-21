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
import useCompanies from "@/hooks/useCompanies";
import { Company } from "@/types/company";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  DataTableToolbar,
  DataTable,
  DataTablePagination,
  ActionsDropdown,
} from "@/components/common/dashboard/table";
import {
  CreateCompanyModal,
  DeleteCompanyModal,
  ReadCompanyModal,
  UpdateCompanyModal,
} from "@/pages/dashboard/companies/Modals";
import { useModal } from "@/hooks/useModal";

const COLUMN_LABELS: Record<string, string> = {
  name: "اسم الشركة",
  address: "العنوان",
  contact_email: "البريد الإلكتروني للتواصل",
  contact_phone: "رقم الهاتف للتواصل",
};

const CompanyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const {
    companies,
    loading,
    error,
    totalCount,
    refreshCompanies,
    nextPageUrl,
    previousPageUrl,
  } = useCompanies({
    page: currentPage,
    search: searchQuery,
    ordering:
      sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : "",
  });

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<Company>();

  // Handlers for CRUD operations - kept for consistency and potential future use
  const handleActionComplete = useCallback(() => {
    refreshCompanies();
  }, [refreshCompanies]);

  // Reset page to 1 when search query or sorting changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting]);

  // Column definitions
  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      ...Object.entries(COLUMN_LABELS).map(([accessorKey, header]) => ({
        accessorKey,
        header: ({ column }: { column: Column<Company> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {header} <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<Company> }) => (
          <div>{row.getValue(accessorKey)}</div>
        ),
        enableColumnFilter: accessorKey !== "name" ? true : false, // Consider simplifying this logic
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
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshCompanies} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5" dir="rtl">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="الشركات"
          addButtonText="إضافة شركة"
          searchPlaceholder="ابحث عن شركة..."
          onAddClick={() => openModal("create")}
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={companies}
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
          noDataMessage="لا توجد شركات لعرضها."
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
      <CreateCompanyModal
        isOpen={modalState.create}
        onClose={() => closeModal("create")}
        onCreate={handleActionComplete}
      />
      <ReadCompanyModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        company={selectedItem}
        onEdit={() => openModal("update", selectedItem!)}
        onDelete={() => openModal("delete", selectedItem!)}
      />
      <UpdateCompanyModal
        isOpen={modalState.update}
        onClose={() => closeModal("update")}
        onUpdate={handleActionComplete}
        company={selectedItem}
      />
      <DeleteCompanyModal
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        onConfirm={handleActionComplete}
        company={selectedItem}
      />
    </section>
  );
};

export default CompanyPage;
