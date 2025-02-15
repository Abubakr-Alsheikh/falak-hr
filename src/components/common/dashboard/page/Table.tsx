import React from "react";

interface TableProps<T> {
  renderHeader: () => React.ReactNode;
  renderRow: (item: T, index: number) => React.ReactNode;
  items: T[];
  isLoading: boolean;
  noDataMessage?: string;
  colSpan?: number;
}

const Table = <T,>({
  renderHeader,
  renderRow,
  items,
  isLoading,
  noDataMessage = "No data available.",
  colSpan = 5,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={colSpan} className="p-4 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary-700"></div>
              </td>
            </tr>
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <React.Fragment key={index}>
                {renderRow(item, index)}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={colSpan} className="p-4 text-center">
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
