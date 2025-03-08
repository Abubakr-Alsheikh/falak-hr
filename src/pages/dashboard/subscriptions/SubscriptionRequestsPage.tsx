import React, { useState, useMemo } from "react";
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
import { ArrowUpDown, Eye, CheckCircle, XCircle } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import useSubscriptions from "@/hooks/useSubscriptions";
import { SubscriptionResponse } from "@/types/subscription";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import {
  DataTableToolbar,
  DataTable,
  DataTablePagination,
  ActionsDropdown,
} from "@/components/common/dashboard/table"; // Import DataTable components
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ReadSubscriptionRequestModal } from "@/pages/dashboard/subscriptions/Modals";
import { useModal } from "@/hooks/useModal";

const COLUMN_LABELS: Record<string, string> = {
  first_name: "الاسم الأول",
  last_name: "اسم العائلة",
  email: "البريد الإلكتروني",
  user_type_display: "نوع المستخدم",
  subscription_type_display: "نوع الاشتراك",
  request_date: "تاريخ الطلب",
  is_processed: "الحالة",
};

const SubscriptionRequestsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const {
    subscriptions,
    loading,
    error,
    totalCount,
    refreshSubscriptions,
    nextPageUrl,
    previousPageUrl,
  } = useSubscriptions({
    page: currentPage,
    search: searchQuery,
    ordering:
      sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : "",
  });

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<SubscriptionResponse>();

  // Reset page to 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting]);

  const columns = useMemo<ColumnDef<SubscriptionResponse>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: ({ column }: { column: Column<SubscriptionResponse> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {COLUMN_LABELS["first_name"]}{" "}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<SubscriptionResponse> }) => (
          <div>
            {row.original.first_name} {row.original.last_name}
          </div>
        ),
      },
      ...Object.entries(COLUMN_LABELS)
        .filter(([key]) => key !== "first_name") // Exclude first_name, already handled
        .map(([accessorKey, header]) => ({
          accessorKey,
          header: ({ column }: { column: Column<SubscriptionResponse> }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {header} <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ row }: { row: Row<SubscriptionResponse> }) => {
            if (accessorKey === "request_date") {
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
            if (accessorKey === "is_processed") {
              return (
                <div className="flex items-center">
                  {row.getValue(accessorKey) ? (
                    <>
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      <span>تمت معالجته</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-4 w-4 text-red-500" />
                      <span>قيد الانتظار</span>
                    </>
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
            ]}
          />
        ),
      },
    ],
    [openModal]
  );

  const table = useReactTable({
    data: subscriptions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
    debugTable: true,
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshSubscriptions} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="طلبات الاشتراك"
          searchPlaceholder="ابحث عن طلب اشتراك..."
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={subscriptions}
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
          noDataMessage="لا توجد طلبات اشتراك لعرضها."
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
      <ReadSubscriptionRequestModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        subscription={selectedItem}
      />
    </section>
  );
};

export default SubscriptionRequestsPage;
