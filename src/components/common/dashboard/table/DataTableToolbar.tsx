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
  addButtonText?: string;
  searchPlaceholder: string;
  onAddClick?: () => void;
  onSearch: (query: string) => void;
  columnLabels?: Record<string, string>;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}
export function DataTableToolbar<TData>({
  table,
  title,
  addButtonText,
  searchPlaceholder,
  onAddClick,
  onSearch,
  columnLabels = {},
  leftContent,
  rightContent,
  children,
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
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {leftContent}
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
      </div>

      {/* Middle Section (Search and Children) */}
      <div className="flex flex-1 items-center justify-center">
        {children}
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      {/* Right Section */}
      <div className="mr-2 flex items-center gap-2">
        {rightContent}
        {onAddClick && addButtonText && (
          <Button onClick={onAddClick}>
            {addButtonText}
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper function for debouncing
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
