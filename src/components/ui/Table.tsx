import React from 'react';
import clsx from 'clsx';

interface Column<T> {
  key: string;
  title: string;
  width?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (record: T, index: number) => void;
  loading?: boolean;
  emptyText?: string;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyText = '데이터가 없습니다.',
  className,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-shimmer h-12 rounded mb-2" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-shimmer h-16 rounded mb-2" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={clsx(
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(record, index)}
              className={clsx(onRowClick && 'cursor-pointer')}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={clsx(
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {column.render
                    ? column.render(record[column.key], record, index)
                    : record[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

