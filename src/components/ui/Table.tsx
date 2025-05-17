import React from 'react';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, index) => {
                const cellContent = typeof column.accessor === 'function'
                  ? column.accessor(item)
                  : item[column.accessor as keyof T];
                
                return (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}
                  >
                    {cellContent as React.ReactNode}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;