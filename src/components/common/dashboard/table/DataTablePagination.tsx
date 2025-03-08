import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
}

export function DataTablePagination({
  currentPage,
  totalCount,
  itemsPerPage,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
  isLoading = false,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  return (
    <div className="mx-2 flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        صفحة {currentPage} من {totalPages}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
          disabled={!canPreviousPage || isLoading}
        >
          السابق
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!canNextPage || isLoading}
        >
          التالي
        </Button>
      </div>
    </div>
  );
}
