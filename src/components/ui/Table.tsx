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
        <div className="h-10 bg-neon-blue/5 rounded mb-2"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-neon-blue/5 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neon-blue/50">No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neon-blue/20">
        <thead className="bg-darker-blue">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neon-blue/20">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-neon-blue/5 transition-colors' : ''}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, index) => {
                const cellContent = typeof column.accessor === 'function'
                  ? column.accessor(item)
                  : item[column.accessor as keyof T];
                
                return (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-neon-blue/80 ${column.className || ''}`}
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