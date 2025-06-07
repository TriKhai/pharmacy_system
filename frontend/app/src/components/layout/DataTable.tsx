import React from 'react';

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  title?: string;
  onRowClick?: (row: T) => void;
};

function DataTable<T extends object>({
  data,
  columns,
  title,
  onRowClick,
}: DataTableProps<T>) {
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row); 
    }
  };

  return (
    <div>
      {title && <h2 className="font-bold text-2xl mb-5">{title}</h2>}
      {data.length === 0 ? (
        <div className="text-content">Không có dữ liệu</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col) => (
                  <th key={String(col.key)} className="border border-gray-300 px-4 py-2 text-left">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice().reverse().map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50" onClick={() => handleRowClick(row)}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="border border-gray-300 px-4 py-2">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key as keyof T] ?? 'N/A')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTable;
