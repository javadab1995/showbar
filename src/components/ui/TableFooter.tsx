

import { PaginationProps } from "../../types";
import { Pagination } from "./Pagination";


export const TableFooter = ({
  pageSize,
  totalItems,
  currentPage,
  onPageSizeChange,
  onPageChange,

}: PaginationProps & { onPageSizeChange: (n: number) => void }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border ">
      <div className="flex items-center gap-2 text-xs text-text/75">
        <label>تعداد ردیف در هر صفحه:</label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-border/75 rounded-lg px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        
      />
    </div>
  );
};
