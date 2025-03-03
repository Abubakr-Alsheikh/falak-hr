import React, { useState, useCallback, useMemo } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCompanies from "@hooks/useCompanies";
import { Company } from "@/types/company";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  CreateCompanyModal,
  DeleteCompanyModal,
  ReadCompanyModal,
  UpdateCompanyModal,
} from "@/pages/dashboard/companies/Modals";
import { companyService } from "@api/companyService";
import { DataTableToolbar } from "@/components/common/dashboard/table/DataTableToolbar";
import { DataTable } from "@/components/common/dashboard/table/DataTable";
import { DataTablePagination } from "@/components/common/dashboard/table/DataTablePagination";
import { ActionsDropdown } from "@/components/common/dashboard/table/ActionsDropdown";

const CompanyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Pass ordering to useCompanies
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

  const handleCreateCompany = useCallback(() => {
    refreshCompanies();
    setIsCreateModalOpen(false);
  }, [refreshCompanies]);

  const handleUpdateCompany = useCallback(() => {
    refreshCompanies();
    setIsUpdateModalOpen(false);
  }, [refreshCompanies]);

  const handleConfirmDeleteCompany = useCallback(async () => {
    if (!selectedCompany) return;
    await companyService.deleteCompany(selectedCompany.id);
    refreshCompanies();
    setIsDeleteModalOpen(false);
  }, [refreshCompanies, selectedCompany]);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenUpdateModal = useCallback((company: Company) => {
    setSelectedCompany(company);
    setIsUpdateModalOpen(true);
  }, []);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleOpenReadModal = useCallback((company: Company) => {
    setSelectedCompany(company);
    setIsReadModalOpen(true);
  }, []);
  const handleCloseReadModal = () => setIsReadModalOpen(false);
  const handleOpenDeleteModal = useCallback((company: Company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  }, []);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  // Reset page to 1 when search query changes AND sorting changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting]);

  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            اسم الشركة <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableColumnFilter: false,
      },
      {
        accessorKey: "address",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            العنوان <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("address")}</div>,
      },
      {
        accessorKey: "contact_email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            البريد الإلكتروني للتواصل <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("contact_email")}</div>,
      },
      {
        accessorKey: "contact_phone",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            رقم الهاتف للتواصل <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("contact_phone")}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const company = row.original;
          const companyActions = [
            {
              label: "معاينة",
              onClick: handleOpenReadModal,
              icon: <Eye className="h-4 w-4" />,
            },
            {
              label: "تعديل",
              onClick: handleOpenUpdateModal,
              icon: <Edit className="h-4 w-4" />,
            },
            {
              label: "حذف",
              onClick: handleOpenDeleteModal,
              icon: <Trash2 className="h-4 w-4" />,
              className: "text-red-500",
            },
          ];
          return <ActionsDropdown data={company} actions={companyActions} />;
        },
      },
    ],
    [handleOpenReadModal, handleOpenUpdateModal, handleOpenDeleteModal]
  );

  const companyColumnLabels: Record<string, string> = {
    name: "اسم الشركة",
    address: "العنوان",
    contact_email: "البريد الإلكتروني للتواصل",
    contact_phone: "رقم الهاتف للتواصل",
  };

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
      <div className="mx-auto">
        <div className="relative overflow-hidden rounded-lg border shadow-lg">
          <DataTableToolbar
            table={table}
            title="الشركات"
            addButtonText="إضافة شركة"
            searchPlaceholder="ابحث عن شركة..."
            onAddClick={handleOpenCreateModal}
            onSearch={setSearchQuery}
            columnLabels={companyColumnLabels}
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
            onPreviousPage={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            onNextPage={() => setCurrentPage((prev) => prev + 1)}
            canPreviousPage={!!previousPageUrl}
            canNextPage={!!nextPageUrl}
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
