import React, { useState } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { DataTable } from "@/components/common/dashboard/table/DataTable";
import { DataTableToolbar } from "@/components/common/dashboard/table";
import { ResourceType } from "@/services/applicationService";
import { AnyApplicationResponse } from "@/types/subscription";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";

interface ApplicationsDataTableProps {
  columns: ColumnDef<AnyApplicationResponse>[];
  data: AnyApplicationResponse[];
  isLoading: boolean;
  resourceType: ResourceType;
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const resourceLabels: Record<ResourceType, string> = {
  trainers: "المدربين",
  trainees: "المتدربين",
  "job-seekers": "الباحثين عن عمل",
};

export const ApplicationsDataTable: React.FC<ApplicationsDataTableProps> = ({
  columns,
  data,
  isLoading,
  resourceType,
  totalCount,
  currentPage,
  onPageChange,
  searchQuery,
  onSearchChange,
}) => {
  // State for sorting and visibility is kept here, but pagination is controlled by the parent
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    // Configure for server-side operations
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    // Set handlers
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mx-auto mt-4 rounded-lg border pb-4 shadow-lg" dir="rtl">
      <DataTableToolbar
        table={table}
        title={`قائمة ${resourceLabels[resourceType]}`}
        searchPlaceholder={`ابحث في طلبات ${resourceLabels[resourceType]}...`}
        onSearch={onSearchChange}
        columnLabels={{
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          created_at: "تاريخ الطلب",
          specialization: "التخصص",
          registrationType: "نوع التسجيل",
          skillsToDevelop: "المهارات المطلوبة",
          yearsOfExperience: "سنوات الخبرة",
        }}
      />
      <DataTable
        // Pass props exactly as expected by the unchanged DataTable component
        data={data}
        columns={columns}
        isLoading={isLoading}
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={DEFAULT_PAGE_SIZE}
        onPageChange={onPageChange}
        sorting={sorting}
        setSorting={setSorting}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        noDataMessage={`لا توجد طلبات ${resourceLabels[resourceType]} لعرضها.`}
      />
    </div>
  );
};
