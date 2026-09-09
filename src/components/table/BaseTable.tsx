import type { ReactNode } from "react";
import Spinner from "../widgets/Spinner";

export type BaseTableColumn<T> = {
  key: string;
  header: ReactNode;
  className?: string;
  
  render: (row: T) => ReactNode;
};

type BaseTableProps<T> = {
  columns: BaseTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  footer: ReactNode;
};

export function BaseTable<T>({
  columns,
  data,
  keyExtractor,
  footer,
  isLoading = false,
  emptyMessage = "موردی برای نمایش وجود ندارد",
}: BaseTableProps<T>) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface/60 backdrop-blur-[1px]">
          <Spinner />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-right font-medium text-text-2 ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="border-b border-border last:border-b-0 hover:bg-surface-2/50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-text ${column.className ?? ""}`}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {footer && (
        <div className="border-t border-border px-4 py-3">{footer}</div>
      )}
    </div>
  );
}
