import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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
  selectedRow?: T | null
};

type SortOrder = 'asc' | 'desc';

function DataTable<T extends object>({
  data,
  columns,
  title,
  onRowClick,
  selectedRow,
}: DataTableProps<T>) {

  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey) return [...data];
    
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if(aVal == null) return 1;
      if(bVal == null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal 
      }
      return sortOrder === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));

    })
  }, [data, sortKey, sortOrder])

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row); 
    }
  };

  return (
    <div className=''>
      {title && <h2 className="font-bold text-2xl mb-5">{title}</h2>}
      {data.length === 0 ? (
        <div className="text-content">Không có dữ liệu</div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[90vh] max-w-[60vw]">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col) => (
                  <th key={String(col.key)} className="border border-gray-300 px-4 py-2 text-left" onClick={() => handleSort(col.key)}>
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        <span className="ml-1 text-sm">
                          <FontAwesomeIcon
                            icon={
                              sortKey === col.key
                                ? sortOrder === 'asc'
                                  ? faSortUp
                                  : faSortDown
                                : faSort
                            }
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.slice().reverse().map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 cursor-pointer ${selectedRow && selectedRow === row ? 'bg-gray-200' : ""}`} onClick={() => handleRowClick(row)}>
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