import { TableColumn, TableExtraColumn } from "../../types/table";

import Spinner from "../widgets/Spinner";



type BaseTableProps<T extends { id: string }> = {
  data: T[];
  columns: TableColumn<T>[];
  extraColumn?: TableExtraColumn<T>;
  isPending?: boolean;

};

export default function BaseTable<T extends { id: string }>({
  data,
  columns,
  extraColumn,
  isPending = false,
 
  
}: BaseTableProps<T>) {
  if (isPending) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-md border border-border">
        <Spinner />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed border-border py-12 text-muted">
        داده‌ای برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border border-border shadow-primary-sm">
      <table className="w-full text-right text-sm text-text">
        <thead className="border-b border-border bg-border">
          <tr className="">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="whitespace-nowrap bg-accent px-6 py-4 text-right font-medium "
              >
                {column.title}
              </th>
            ))}

            {extraColumn && (
              <th className="w-24 whitespace-nowrap px-6 py-4 text-center font-medium">
                {extraColumn.header}
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr
              key={row.id}
              className="group transition-colors hover:bg-surface-2"
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4">
                  {column.render
                    ? column.render(row)
                    : String(row[column.key as keyof T] ?? "_")}
                </td>
              ))}

              {extraColumn && (
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-75 transition-opacity duration-200 group-hover:opacity-100">
                    {extraColumn.render(row)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
}
