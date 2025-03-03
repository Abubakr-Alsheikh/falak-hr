// src/components/common/dashboard/table/DataTableToolbar.tsx
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table as TanStackTable } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: TanStackTable<TData>;
  title: string;
  addButtonText: string;
  searchPlaceholder: string;
  onAddClick?: () => void;
  onSearch: (query: string) => void;
  columnLabels?: Record<string, string>; // Add this prop
}
export function DataTableToolbar<TData>({
  table,
  title,
  addButtonText,
  searchPlaceholder,
  onAddClick,
  onSearch,
  columnLabels = {}, // Provide a default empty object
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 200),
    [onSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 md:flex-row">
      <div className="flex w-full flex-col items-center md:flex-row md:space-x-4">
        <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              الاعمدة الظاهرة
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const label = columnLabels[column.id] || column.id;

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
      <div className="flex w-full gap-2 md:w-fit">
        {onAddClick && (
          <Button onClick={onAddClick} className="w-full">
            {addButtonText}
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper function for debouncing (no changes needed)
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
