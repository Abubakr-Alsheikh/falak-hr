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
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useServiceRequests } from "@/hooks/useServiceRequests";
import { ServiceRequest, ServiceRequestStatus } from "@/types/serviceRequest";
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
import { useModal } from "@/hooks/useModal";
import { ServiceRequestDetailsModal } from "./ServiceRequestDetailsModal";

const COLUMN_LABELS: Record<string, string> = {
  companyName: "اسم الشركة",
  requestType: "نوع الطلب",
  status: "الحالة",
  created_at: "تاريخ الطلب",
};

const statusLabels: Record<ServiceRequestStatus, string> = {
  pending_review: "قيد المراجعة",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
  in_progress: "قيد التنفيذ",
  completed: "مكتمل",
};

const ServiceRequestsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<ServiceRequest>();

  const {
    requests,
    loading,
    error,
    totalCount,
    refreshRequests,
    nextPageUrl,
    previousPageUrl,
  } = useServiceRequests({
    page: currentPage,
    search: searchQuery,
    ordering:
      sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : "",
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sorting]);

  const columns = useMemo<ColumnDef<ServiceRequest>[]>(
    () => [
      {
        accessorKey: "companyName",
        header: "اسم الشركة",
      },
      {
        accessorKey: "requestType",
        header: "نوع الطلب",
        cell: ({ row }) => {
          const type = row.getValue(
            "requestType"
          ) as ServiceRequest["requestType"];
          return (
            <div>
              {type === "main_facility" ? "منشأة رئيسية" : "تعديل بيانات"}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
          const status = row.getValue("status") as ServiceRequestStatus;
          const statusLabel = statusLabels[status];
          const variant = {
            pending_review: "default",
            approved: undefined,
            rejected: "destructive",
            in_progress: "secondary",
            completed: "outline",
          }[status] as
            | "default"
            | "secondary"
            | "destructive"
            | "outline"
            | undefined;
          return <Badge variant={variant}>{statusLabel}</Badge>;
        },
      },
      {
        accessorKey: "created_at",
        header: ({ column }: { column: Column<ServiceRequest> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            تاريخ الطلب <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row<ServiceRequest> }) => {
          return (
            <div>
              {format(
                new Date(row.getValue("created_at")),
                "dd/MM/yyyy HH:mm",
                { locale: ar }
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
          <ActionsDropdown
            data={row.original}
            actions={[
              {
                label: "عرض التفاصيل",
                onClick: () => openModal("read", row.original),
                icon: <Eye className="h-4 w-4" />,
              },
              // Add other actions like 'Approve', 'Reject' here if needed
            ]}
          />
        ),
      },
    ],
    [openModal]
  );

  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
    manualPagination: true, // Server-side pagination
    manualSorting: true, // Server-side sorting
  });

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshRequests} />;
  }

  return (
    <section className="p-3 antialiased sm:p-5">
      <div className="mx-auto rounded-lg border shadow-lg">
        <DataTableToolbar
          table={table}
          title="طلبات الخدمات"
          searchPlaceholder="ابحث عن شركة..."
          onSearch={setSearchQuery}
          columnLabels={COLUMN_LABELS}
        />
        <DataTable
          data={requests}
          columns={columns}
          isLoading={loading}
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={DEFAULT_PAGE_SIZE}
          noDataMessage="لا توجد طلبات خدمات لعرضها."
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

      <ServiceRequestDetailsModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        request={selectedItem}
      />
    </section>
  );
};

export default ServiceRequestsPage;
