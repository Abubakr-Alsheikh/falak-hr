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
import { ArrowUpDown, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import useInquiries from "@/hooks/useInquiries";
import { Inquiry } from "@/types/inquiry";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  DataTableToolbar,
  DataTable,
  DataTablePagination,
  ActionsDropdown,
} from "@/components/common/dashboard/table";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  ReadInquiryModal,
  DeleteInquiryModal,
} from "@/pages/dashboard/inquiries/Modals";
import { useModal } from "@/hooks/useModal";

const COLUMN_LABELS: Record<string, string> = {
  name: "الاسم",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  message: "الرسالة",
  created_at: "تاريخ الإنشاء",
};

const InquiriesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const {
    inquiries,
    loading,
    error,
    totalCount,
    refreshInquiries,
    nextPageUrl,
    previousPageUrl,
  } = useInquiries({
    page: currentPage,
    search: searchQuery,
    ordering:
      sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : "",
  });

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<Inquiry>();

  // Handlers for CRUD operations - kept for consistency and potential future use
  const handleActionComplete = useCallback(() => {
    refreshInquiries();
  }, [refreshInquiries]);

  // Reset page to 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting]);

  const columns = useMemo<ColumnDef<Inquiry>[]>(
    () => [
      ...Object.entries(COLUMN_LABELS).map(([accessorKey, header]) => ({
        accessorKey,
        header: ({ column }: { column: Column<Inquiry> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {header} <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<Inquiry> }) => {
          if (accessorKey === "created_at") {
            return (
              <div>
                {format(
                  new Date(row.getValue(accessorKey)),
                  "dd/MM/yyyy HH:mm",
                  {
                    locale: ar,
                  }
                )}
              </div>
            );
          }
          return <div>{row.getValue(accessorKey)}</div>;
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
    data: inquiries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshInquiries} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="الاستفسارات"
          searchPlaceholder="ابحث عن استفسار..."
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={inquiries}
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
          noDataMessage="لا توجد استفسارات لعرضها."
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
      <ReadInquiryModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        inquiry={selectedItem}
      />
      <DeleteInquiryModal
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        onConfirm={handleActionComplete}
        inquiry={selectedItem}
      />
    </section>
  );
};

export default InquiriesPage;
