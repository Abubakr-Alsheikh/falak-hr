import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionsDropdown } from "@/components/common/dashboard/table";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  AnyApplicationResponse,
  isJobSeeker,
  isTrainee,
  isTrainer,
} from "@/types/subscription";
import { ResourceType } from "@/services/applicationService";

// A helper function to create a sortable header
const createSortableHeader = (label: string) => {
  return ({ column }: { column: any }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="mr-2 h-4 w-4" />
    </Button>
  );
};

// Define common columns shared across all application types
const commonColumns = (
  onView: (application: AnyApplicationResponse) => void
): ColumnDef<AnyApplicationResponse>[] => [
  {
    accessorKey: "fullName",
    header: createSortableHeader("الاسم الكامل"),
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "created_at",
    header: createSortableHeader("تاريخ الطلب"),
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "dd/MM/yyyy", { locale: ar }),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsDropdown
        data={row.original}
        actions={[
          {
            label: "معاينة",
            onClick: () => onView(row.original),
            icon: <Eye className="h-4 w-4" />,
          },
        ]}
      />
    ),
  },
];

// Define columns specific to each resource type
const resourceSpecificColumns: Record<
  ResourceType,
  ColumnDef<AnyApplicationResponse>[]
> = {
  trainers: [
    {
      accessorKey: "specialization",
      header: "التخصص",
      cell: ({ row }) =>
        isTrainer(row.original) ? row.original.specialization : "-",
    },
    {
      accessorKey: "registrationType",
      header: "نوع التسجيل",
      cell: ({ row }) =>
        isTrainer(row.original) ? row.original.registrationType : "-",
    },
  ],
  trainees: [
    {
      accessorKey: "skillsToDevelop",
      header: "المهارات المطلوبة",
      cell: ({ row }) =>
        isTrainee(row.original) ? row.original.skillsToDevelop : "-",
    },
  ],
  "job-seekers": [
    {
      accessorKey: "specialization",
      header: "التخصص",
      cell: ({ row }) =>
        isJobSeeker(row.original) ? row.original.specialization : "-",
    },
    {
      accessorKey: "yearsOfExperience",
      header: createSortableHeader("سنوات الخبرة"),
      cell: ({ row }) =>
        isJobSeeker(row.original) ? row.original.yearsOfExperience : "-",
    },
  ],
};

// Main function to generate columns based on the resource type
export const getColumnsForResource = (
  resource: ResourceType,
  onView: (application: AnyApplicationResponse) => void
): ColumnDef<AnyApplicationResponse>[] => {
  return [
    ...commonColumns(onView).slice(0, 2), // fullName, email
    ...resourceSpecificColumns[resource],
    ...commonColumns(onView).slice(2), // created_at, actions
  ];
};
